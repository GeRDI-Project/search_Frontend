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
  sanitizePageNumber(pageNumber) {
    return pageNumber && Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1
  },
  sanitizeConstraints(selectedConstraints) {
    Object.values(selectedConstraints).forEach((key, value) => {
      if (!facetsprovider.getFacetNames().includes(key) || !Array.isArray(value)) {
        return {}
      }
    })
    return selectedConstraints || {}
  },
  // create an object which contains for each facet an initially empty Array or Object
  createInitialConstraintsObject(valueType) {
    let obj = {}
    facetsprovider.getFacetNames().forEach(facetName => {
      obj[facetName] = new valueType()
    })
    return obj
  }
}

// initial state
const state = {
  isSearching: false,
  results: {},
  previousQueryString: '',
  selectedConstraints: helper.createInitialConstraintsObject(Array),
  previouslyAppliedConstraints: helper.createInitialConstraintsObject(Array),
  constraintCounts: helper.createInitialConstraintsObject(Object)
}

const getters = {
  isSearching: state => {
    return state.isSearching
  },
  getFacetNames: state => {
    return facetsprovider.getFacetNames()
  },
  getFacetTitle: state => facetName => {
    return facetsprovider.getFacet(facetName).title
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
  getOnlyFacetsWithSelectedConstraints: state => {
    let obj = {}
    facetsprovider.getFacetNames().forEach(facetName => {
      let arr = state.selectedConstraints[facetName]
      if (arr.length > 0) {
        obj[facetName] = arr
      }
    })
    return obj
  },
  areAnyConstraintsSelected: state => {
    return Object.values(state.selectedConstraints).some(arr => arr.length > 0)
  },
  wereAnyConstraintsApplied: state => {
    return Object.values(state.previouslyAppliedConstraints).some(arr => arr.length > 0)
  }
}

const actions = {
  search({ commit, state }, payload) {
    commit('setSearchingStatus', true)
    commit('setResults', [])
    var queryStringFromQuery = payload.queryString
    var currentPageFromQuery = helper.sanitizePageNumber(payload.currentPage)
    var constraintsFromQuery = helper.sanitizeConstraints(payload.selectedConstraints)
    var query = querybuilder.buildQuery(
      queryStringFromQuery,
      constraintsFromQuery
    )
    var url = constants.apiUrlPrefix + '&size=' + constants.numDocsPerPage
    if (currentPageFromQuery > 1) {
      url += '&from=' + (currentPageFromQuery - 1) * constants.numDocsPerPage
    }
    axios.post(url, query)
      .then(function (response) {
        commit('setResults', response.data)
        commit('setConstraintsFromQuery', constraintsFromQuery)
        commit('updateFacetsModel', queryStringFromQuery)
        commit('setSearchingStatus', false)
      })
      .catch(function(error) {
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
    facetsprovider.getFacetNames().forEach(facetName => {
      state.selectedConstraints[facetName] =
        constraintsFromQuery[facetName] || []
    })
  },
  setSearchingStatus(state, bool) {
    state.isSearching = bool
  },
  setResults(state, results) {
    state.results = results
  },
  updateFacetsModel(state, queryStringFromQuery) {
    if (queryStringFromQuery === state.previousQueryString && getters.areAnyConstraintsSelected(state)) {
      // Which facets have constraints added? Are the counts invalid due to any constraint removal?
      let addedConstraints = {}
      let previousCountsInvalid = false
      facetsprovider.getFacetNames().forEach(facetName => {
        let currentSelection = state.selectedConstraints[facetName]
        let lastSelection = state.previouslyAppliedConstraints[facetName]
        addedConstraints[facetName] = !currentSelection.every(e =>
          lastSelection.includes(e)
        )
        previousCountsInvalid |= !lastSelection.every(e =>
          currentSelection.includes(e)
        )
      })
      // Update counts of facet depending of any changes
      facetsprovider.getFacetNames().forEach(facetName => {
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
    } else {
      mutations.updateAllConstraintCountsFromResults(state)
    }
    // store for next search/filtering
    state.previousQueryString = queryStringFromQuery
    facetsprovider.getFacetNames().forEach(facetName => {
      state.previouslyAppliedConstraints[facetName] = state.selectedConstraints[
        facetName
      ].slice(0)
    })
  },
  updateAllConstraintCountsFromResults(state) {
    facetsprovider.getFacetNames().forEach(facetName => {
      mutations.updateAConstraintFromResult(state, facetName)
    })
  },
  updateAConstraintFromResult(
    state,
    facetName,
    amendConstraintsNotPresentInResults = false,
    setAmendedConstraintsToZero = true
  ) {
    var updatedCounts = {}
    if (amendConstraintsNotPresentInResults) {
      if (setAmendedConstraintsToZero) {
        Object.keys(state.constraintCounts[facetName]).forEach(constraint => {
          updatedCounts[constraint] = 0
        })
      } else {
        Object.values(state.constraintCounts[facetName]).forEach(
          (constraint, count) => {
            updatedCounts[constraint] = count
          }
        )
      }
    }
    var converter = facetsprovider.getFacet(facetName).converter || (x => x)
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
