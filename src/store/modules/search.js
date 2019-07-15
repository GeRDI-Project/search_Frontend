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

const constant = {
  facets: ["publisher", "author", "year", "language"],
  facetTitles: { publisher: "Publisher", author: "Author", year: "Publication Year", language: "Language" },
  facetBucketNames: { publisher: "Publisher", author: "Creator", year: "PublicationYear", language: "Language" },
  facetConverters: { year: x => new Date(x).getYear() + 1900 },
  numDocsPerPage: 10,
  apiUrlPrefix: '/api/search?'
}

// initial state 
const state = {
  isSearching: false,
  previousQueryString: "",
  facets: {
    selectedConstraints: constant.facets.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
    selectedConstraintsForLastFiltering: constant.facets.reduce((obj, facet) => { obj[facet] = []; return obj }, {}),
    constraintCounts: constant.facets.reduce((obj, facet) => { obj[facet] = {}; return obj }, {}),
  },
  results: {},
  queryPayload: {}
}

const getters = {
  isSearching: state => {
    return state.isSearching
  },
  getAvailableFacets: state => {
    return constant.facets
  },
  getFacetTitle: (state) => (facet) => {
    return constant.facetTitles[facet]
  },
  getSelectedConstraints: (state) => (facet) => {
    return state.facets.selectedConstraints[facet]
  },
  getConstraintCounts: (state) => (facet) => {
    return state.facets.constraintCounts[facet]
  },
  getNumDocsPerPage: state => {
    return constant.numDocsPerPage
  },
  getResults: state => {
    return state.results.hits ? state.results.hits.hits : [] 
  },
  getResultsQueryString: state => {
    return state.queryPayload.query
  },
  getResultsAmount: state => {
    return state.results.hits ? state.results.hits.total : 0
  },
  getOnlySelectedConstraints: state => {
    var res = {}
    constant.facets.forEach(facet => {
      if (state.facets.selectedConstraints[facet].length > 0) {
        res[facet] = state.facets.selectedConstraints[facet]
      }
    })
    return res
  },
  areAnyConstraintsSelected: state => {
    var res = false
    constant.facets.forEach(facet => { 
      if (state.facets.selectedConstraints[facet].length > 0) { res = true }
    })
    return res
  },
  haveAnyConstraintsBeenApplied: state => {
    var res = false    
    constant.facets.forEach(facet => { 
      if (state.facets.selectedConstraintsForLastFiltering[facet].length > 0) { res = true }
    })
    return res
  }
}

const actions = {
  search({ commit, state }, payload) {
    var querystring = payload.query
    var currentPage = payload.currentPage
    if (state.queryPayload.query !== querystring) {
    commit('setSearchingStatus', true)
      commit('setQueryPayload', payload)
    commit('setResults', [])
    var queryString = payload.queryString
    var currentPage = payload.currentPage ? payload.currentPage : 1                            // TODO: sanity checks: Number.isInteger > 0
    var constraintsFromQuery = payload.selectedConstraints ? payload.selectedConstraints : {}  // TODO: sanity check(s)      
    var query = querybuilder.buildQuery(queryString, {
      selectedPublishers: constraintsFromQuery.publisher || [],
      selectedAuthors: constraintsFromQuery.author || [],
      selectedYears: constraintsFromQuery.year || [],
      selectedLanguages: constraintsFromQuery.language || []
    })
    var url = constant.apiUrlPrefix.concat('&size=').concat(constant.numDocsPerPage)
    if (currentPage > 1) {
      url = url.concat('&from=').concat(currentPage * constant.numDocsPerPage - constant.numDocsPerPage)
    }
    axios.post(url, query)
      .then(function (response) {
        commit('setResults', response.data)
        commit('setConstraintsFromQuery', constraintsFromQuery)
        commit('updateFacetsModel', queryString)
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
    state.facets.selectedConstraints[payload.facet] = Array.isArray(payload.arr) ? payload.arr : []
  },
  setConstraintsFromQuery(state, constraintsFromQuery) {
    constant.facets.forEach(facet => {
      state.facets.selectedConstraints[facet] = constraintsFromQuery[facet] ? constraintsFromQuery[facet] : []
    })
  },
  setSearchingStatus(state, bool) {
    state.isSearching = bool
  },
  setResults(state, results) {
    state.results = results
  },
  setQueryPayload (state, payload) {
    state.queryPayload = payload
  },
  updateFacetsModel(state, queryString) {
    if (queryString != state.previousQueryString) {
      constant.facets.forEach(facet => state.facets.selectedConstraints[facet] = [])
      helper.updateAllConstraintCountsFromResults()
    } else if (!getters.areAnyConstraintsSelected(state)) {
      helper.updateAllConstraintCountsFromResults()
    } else {
      // Which facets have constraints added? Are the counts invalid due to any removal?
      let addedConstraints = {}
      let previousCountsInvalid = false
      constant.facets.forEach(facet => {
        let currentSelection = state.facets.selectedConstraints[facet]
        let lastSelection = state.facets.selectedConstraintsForLastFiltering[facet]
        addedConstraints[facet] = !currentSelection.every(e => lastSelection.includes(e))
        previousCountsInvalid |= !lastSelection.every(e => currentSelection.includes(e))
      })
      // Update counts of facet depending of any changes
      constant.facets.forEach(facet => {
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
    state.previousQueryString = queryString
    constant.facets.forEach(facet => {
      state.facets.selectedConstraintsForLastFiltering[facet] = state.facets.selectedConstraints[facet].slice(0)
    })
  }
}

const helper = {
  updateAllConstraintCountsFromResults() {
    constant.facets.forEach(facet => {
      helper.updateAConstraintFromResult(facet)
    })
  },
  updateAConstraintFromResult(facet, amendConstraintsNotPresentInResults = false, setAmendedToZero = true) {
    var updatedCounts = {}
    if (amendConstraintsNotPresentInResults) {
      Object.keys(state.facets.constraintCounts[facet]).forEach(constraint => {
        if (setAmendedToZero) {
          updatedCounts[constraint] = 0
        } else {
          updatedCounts[constraint] = state.facets.constraintCounts[facet][constraint]
        }
      })
    }
    var converter = constant.facetConverters[facet] ? constant.facetConverters[facet] : x => x
    state.results.aggregations[constant.facetBucketNames[facet]].buckets.forEach(bucketEntry => {
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
