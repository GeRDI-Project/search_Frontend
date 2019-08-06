/**
 * Copyright 2018 Nelson Tavares de Sousa, Ingo Thomsen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import axios from 'axios'
import querybuilder from '../../util/querybuilder.js'
import facetsprovider from '../../util/facetsprovider.js'

/* eslint-disable */
const constants = {  
  numDocsPerPage: 10,
  apiUrlPrefix: '/api/search?'
}

const helper = {
  checkedCurrentPage(payload) {
    var page = payload.checkedCurrentPage
    return Number.isInteger(page) && page > 0 ? page : 1
  },
  checkedConstraints(payload) {
    var constraints = payload.selectedConstraints || {}
    Object.values(constraints).forEach((key, value) => {
      if (!facetsprovider.facetNames.includes(key) || !Array.isArray(value)) {
        return {}
      }
    })
    return constraints
  }
}

// initial state 
const state = {
  isSearching: false,
  results: {},
  previousQueryString: "",
  selectedConstraints: facetsprovider.facetNames.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
  selectedConstraintsForLastFiltering: facetsprovider.facetNames.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
  constraintCounts: facetsprovider.facetNames.reduce((obj, facet) => { obj[facet] = {}; return obj }, {})
}

const getters = {
  isSearching: state => {
    return state.isSearching
  },
  getFacetNames: state => {
    return facetsprovider.facetNames
  },
  getFacetTitle: state => facetName => {
    return facetsprovider.facet[facetName].title
  },
  getSelectedConstraints: state => facetName => {
    return state.selectedConstraints[facetName]
  },
  getConstraintCounts: state => facetName => {
    return state.constraintCounts[facetName]
  },
  getNumDocsPerPage: state => {
    return constants.numDocsPerPage
  },
  getResults: state => {
    return state.results.hits ? state.results.hits.hits : []
  },
  getResultsAmount: state => {
    return state.results.hits ? state.results.hits.total : 0
  },
  getOnlySelectedConstraints: state => {
    return facetsprovider.facetNames.reduce((obj, facetName) => {
      if (state.selectedConstraints[facetName].length > 0) {
        obj[facetName] = state.selectedConstraints[facetName]
      }
      return obj
    }, {})
  },
  areAnyConstraintsSelected: state => {
    return facetsprovider.facetNames.some(facetName => state.selectedConstraints[facetName].length > 0)
  },
  haveAnyConstraintsBeenApplied: state => {
    return facetsprovider.facetNames.some(facetName => state.selectedConstraintsForLastFiltering[facetName].length > 0)
  }
}

const actions = {
  search({ commit, state }, payload) {
    commit('setSearchingStatus', true)
    commit('setResults', [])
    var queryStringFromQuery = payload.queryString
    var currentPageFromQuery = helper.checkedCurrentPage(payload)
    var constraintsFromQuery = helper.checkedConstraints(payload)
    var query = querybuilder.buildQuery(queryStringFromQuery, constraintsFromQuery)
    var url = constants.apiUrlPrefix.concat('&size=').concat(constants.numDocsPerPage)
    if (currentPageFromQuery > 1) {
      url = url.concat('&from=').concat(currentPageFromQuery * constants.numDocsPerPage - constants.numDocsPerPage)
    }
    axios.post(url, query)
      .then(function (response) {
        commit('setResults', response.data)
        commit('setConstraintsFromQuery', constraintsFromQuery)
        commit('updateFacetsModel', queryStringFromQuery)
        commit('setSearchingStatus', false)
      })
      .catch(function (error) {
        console.log(error)
        commit('setSearchingStatus', false)
      })
  }
}

const mutations = {
  setConstraintsForAFacet(state, payload) {
    state.selectedConstraints[payload.facetName] = payload.arr || []
  },
  setConstraintsFromQuery(state, constraintsFromQuery) {
    facetsprovider.facetNames.forEach(facetName => {
      state.selectedConstraints[facetName] = constraintsFromQuery[facetName] || []
    })
  },
  setSearchingStatus(state, bool) {
    state.isSearching = bool
  },
  setResults(state, results) {
    state.results = results
  },
  updateFacetsModel(state, queryStringFromQuery) {
    if (queryStringFromQuery != state.previousQueryString) {
      facetsprovider.facetNames.forEach(facetName => {
        state.selectedConstraints[facetName] = []
      })
      mutations.updateAllConstraintCountsFromResults(state)
    } else if (!getters.areAnyConstraintsSelected(state)) {
      mutations.updateAllConstraintCountsFromResults(state)
    } else {
      // Which facets have constraints added? Are the counts invalid due to any constraint removal?
      let addedConstraints = {}
      let previousCountsInvalid = false
      facetsprovider.facetNames.forEach(facetName => {
        let currentSelection = state.selectedConstraints[facetName]
        let lastSelection = state.selectedConstraintsForLastFiltering[facetName]
        addedConstraints[facetName] = !currentSelection.every(e => lastSelection.includes(e))
        previousCountsInvalid |= !lastSelection.every(e => currentSelection.includes(e))
      })
      // Update counts of facet depending of any changes
      facetsprovider.facetNames.forEach(facetName => {
        if (previousCountsInvalid) {
          if (addedConstraints[facetName]) {
            mutations.updateAConstraintFromResult(state, facetName, true, false)
          } else {
            mutations.updateAConstraintFromResult(state, facetName)
          }
        } else if (!addedConstraints[facetName]) {
          mutations.updateAConstraintFromResult(state, facetName, true)
        }
      })
    }
    // store for next search/filtering
    state.previousQueryString = queryStringFromQuery
    facetsprovider.facetNames.forEach(facetName => {
      state.selectedConstraintsForLastFiltering[facetName] = state.selectedConstraints[facetName].slice(0)
    })
  },
  updateAllConstraintCountsFromResults(state) {
    facetsprovider.facetNames.forEach(facetName => {
      mutations.updateAConstraintFromResult(state, facetName)
    })
  },
  updateAConstraintFromResult(state, facetName, amendConstraintsNotPresentInResults = false, setAmendedToZero = true) {
    var updatedCounts = {}
    if (amendConstraintsNotPresentInResults) {
      if (setAmendedToZero) {
        Object.keys(state.constraintCounts[facetName]).forEach(constraint => {
          updatedCounts[constraint] = 0
        })
      } else {
        Object.values(state.constraintCounts[facetName]).forEach((constraint, count) => {
          updatedCounts[constraint] = count
        })
      }
    }    
    var converter = facetsprovider.facet[facetName].esConverter || ( x => x )
    state.results.aggregations[facetName].buckets.forEach(bucketEntry => {
      updatedCounts[converter(bucketEntry.key)] = bucketEntry.doc_count
    })
    state.constraintCounts[facetName] = updatedCounts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
