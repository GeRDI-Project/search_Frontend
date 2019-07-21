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

/* eslint-disable */

const constants = {
  facets: ["publisher", "author", "year", "language"],
  facetTitles: { publisher: "Publisher", author: "Author", year: "Publication Year", language: "Language" },
  facetConverters: { year: x => new Date(x).getYear() + 1900 },
  numDocsPerPage: 10,
  apiUrlPrefix: '/api/search?'
}

// initial state 
const state = {
  isSearching: false,
  results: {},
  previousQueryString: "",
  facets: {
    selectedConstraints: constants.facets.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
    selectedConstraintsForLastFiltering: constants.facets.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
    constraintCounts: constants.facets.reduce((obj, facet) => { obj[facet] = {}; return obj }, {})
  }
}

const getters = {
  isSearching: state => {
    return state.isSearching
  },
  getAvailableFacets: state => {
    return constants.facets
  },
  getFacetTitle: (state) => (facet) => {
    return constants.facetTitles[facet]
  },
  getSelectedConstraints: (state) => (facet) => {
    return state.facets.selectedConstraints[facet]
  },
  getConstraintCounts: (state) => (facet) => {
    return state.facets.constraintCounts[facet]
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
    return constants.facets.reduce((obj, facet) => {
      if (state.facets.selectedConstraints[facet].length > 0) {
        obj[facet] = state.facets.selectedConstraints[facet]
      }
      return obj
    }, {})
  },
  areAnyConstraintsSelected: state => {
    return constants.facets.some(facet => state.facets.selectedConstraints[facet].length > 0)
  },
  haveAnyConstraintsBeenApplied: state => {
    return constants.facets.some(facet => state.facets.selectedConstraintsForLastFiltering[facet].length > 0)
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
    state.facets.selectedConstraints[payload.facet] = payload.arr || []
  },
  setConstraintsFromQuery(state, constraintsFromQuery) {
    constants.facets.forEach(facet => {
      state.facets.selectedConstraints[facet] = constraintsFromQuery[facet] || []
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
      constants.facets.forEach(facet => {
        state.facets.selectedConstraints[facet] = []
      })
      helper.updateAllConstraintCountsFromResults()
    } else if (!getters.areAnyConstraintsSelected(state)) {
      helper.updateAllConstraintCountsFromResults()
    } else {
      // Which facets have constraints added? Are the counts invalid due to any constraint removal?
      let addedConstraints = {}
      let previousCountsInvalid = false
      constants.facets.forEach(facet => {
        let currentSelection = state.facets.selectedConstraints[facet]
        let lastSelection = state.facets.selectedConstraintsForLastFiltering[facet]
        addedConstraints[facet] = !currentSelection.every(e => lastSelection.includes(e))
        previousCountsInvalid |= !lastSelection.every(e => currentSelection.includes(e))
      })
      // Update counts of facet depending of any changes
      constants.facets.forEach(facet => {
        if (previousCountsInvalid) {
          if (addedConstraints[facet]) {
            helper.updateAConstraintFromResult(facet, true, false)
          } else {
            helper.updateAConstraintFromResult(facet)
          }
        } else if (!addedConstraints[facet]) {
          helper.updateAConstraintFromResult(facet, true)
        }
      })
    }
    // store for next search/filtering
    state.previousQueryString = queryStringFromQuery
    constants.facets.forEach(facet => {
      state.facets.selectedConstraintsForLastFiltering[facet] = state.facets.selectedConstraints[facet].slice(0)
    })
  }
}

const helper = {
  checkedCurrentPage(payload) {
    var page = payload.checkedCurrentPage
    return Number.isInteger(page) && page > 0 ? page : 1
  },
  checkedConstraints(payload) {
    var constraints = payload.selectedConstraints || {}
    Object.values(constraints).forEach((key, value) => {
      if (!constants.facets.includes(key) || !Array.isArray(value)) {
        return {}
      }
    })
    return constraints
  },
  updateAllConstraintCountsFromResults() {
    constants.facets.forEach(facet => {
      helper.updateAConstraintFromResult(facet)
    })
  },
  updateAConstraintFromResult(facet, amendConstraintsNotPresentInResults = false, setAmendedToZero = true) {
    var updatedCounts = {}
    if (amendConstraintsNotPresentInResults) {
      if (setAmendedToZero) {
        Object.keys(state.facets.constraintCounts[facet]).forEach(constraint => {
          updatedCounts[constraint] = 0
        })
      } else {
        Object.values(state.facets.constraintCounts[facet]).forEach((constraint, count) => {
          updatedCounts[constraint] = count
        })
      }
    }
    var converter = constants.facetConverters[facet] ? constants.facetConverters[facet] : x => x
    state.results.aggregations[facet].buckets.forEach(bucketEntry => {
      updatedCounts[converter(bucketEntry.key)] = bucketEntry.doc_count
    })
    state.facets.constraintCounts[facet] = updatedCounts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
