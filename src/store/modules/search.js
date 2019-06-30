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
// initial state
const state = {
  isSearching: false,
  results: {},
  queryPayload: {},
  numDocsPerPage: 10,
  facetsModel: {
    selectedPublishers: [],
    selectedYears: [],
    selectedAuthors: [],
    selectedLanguages: [],
    selectedPublishersForLastFiltering: [],
    selectedYearsForLastFiltering: [],
    selectedAuthorsForLastFiltering: [],
    selectedLanguagesForLastFiltering: [],
    countsOfAllPublishers: {},
    countsOfAllYears: {},
    countsOfAllAuthors: {},
    countsOfAllLanguages: {}
  }
}

// getters
const getters = {
  isSearching: state => {
    return state.isSearching
  },
  getResults: state => {
    if (state.results.hits) {
      return state.results.hits.hits
    }
    return []
  },
  getResultsQueryString: state => {
    return state.queryPayload.query
  },
  getAggregations: state => {
    if (state.results.aggregations) {
      return state.results.aggregations
    }
    return {}
  },
  getResultsAmount: state => {
    if (state.results.hits) {
      return state.results.hits.total
    }
    return 0
  },
  getFacetsModel: state => {
    return state.facetsModel
  },
  areAnyFacetValueSelected: state => {
    return state.facetsModel.selectedPublishers.length || state.facetsModel.selectedAuthors.length || state.facetsModel.selectedYears.length || state.facetsModel.selectedLanguages.length
  },
  areAnyFacetFilteringApplied: state => {
    return state.facetsModel.selectedPublishersForLastFiltering.length || state.facetsModel.selectedAuthorsForLastFiltering.length || state.facetsModel.selectedYearsForLastFiltering.length || state.facetsModel.selectedLanguagesForLastFiltering.length
  }
}

// actions
const actions = {
  search({ commit, state }, payload) {
    let querystring = payload.query
    let currentPage = payload.currentPage
    if (state.queryPayload.query !== querystring) {
      commit('setSearchingStatus', true)
      commit('setQueryPayload', payload)
      commit('setResults', [])
      var url = '/api/search?'
      if (currentPage) {
        url = url.concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage)
      }
      url = url.concat('&size=').concat(state.numDocsPerPage)
      axios.post(url,
        querybuilder.buildQuery(querystring, {}))
        .then(function (response) {
          commit('setResults', response.data)
          commit('initFacetsModel')
          commit('setSearchingStatus', false)
        })
        .catch(function (error) {
          console.log(error)
          commit('setSearchingStatus', false)
        })
    }
  },
  filter({ commit, state }, facetsModel) {
    commit('setSearchingStatus', true)
    let currentPage = state.queryPayload.currentPage
    commit('setResults', [])
    var url = '/api/search?'
    if (currentPage) {
      url = url.concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage)
    }
    url = url.concat('&size=').concat(state.numDocsPerPage)
    axios.post(url,
      querybuilder.buildQuery(state.queryPayload.query, facetsModel))
    .then(function(response) {
      commit('setResults', response.data)
      commit('updateFacetsModel')
      commit('setSearchingStatus', false)
    })
    .catch(function(error) {
      console.log(error)
      commit('setSearchingStatus', false)
    })
  },
  resetState({commit, state}) {
    commit('setResults', [])
    commit('setQueryPayload', [])
    commit('setFacetsModel', {
      selectedPublishers: [],
      selectedYears: [],
      selectedAuthors: [],
      selectedLanguages: [],
      selectedPublishersForLastFiltering: [],
      selectedYearsForLastFiltering: [],
      selectedAuthorsForLastFiltering: [],
      selectedLanguagesForLastFiltering: [],
      countsOfAllPublishers: {},
      countsOfAllYears: {},
      countsOfAllAuthors: {},
      countsOfAllLanguages: {}
    })
  }
}

// mutations
const mutations = {
  setSearchingStatus (state, bool) {
    state.isSearching = bool
  },
  setResults (state, results) {
    state.results = results
  },
  setQueryPayload (state, payload) {
    state.queryPayload = payload
  },
  setFacetsModel (state, newModel) {
    state.facetsModel = newModel
  },
  initFacetsModel (state) {
    function fromBuckets (buckets, converter = x => x) {
      var res = {}
      buckets.forEach(x => { res[converter(x.key)] = x.doc_count })
      return res
    }
    state.facetsModel = {
      countsOfAllPublishers: fromBuckets(state.results.aggregations.Publisher.buckets),
      countsOfAllAuthors: fromBuckets(state.results.aggregations.Creator.buckets),
      countsOfAllYears: fromBuckets(state.results.aggregations.PublicationYear.buckets, x => new Date(x).getYear() + 1900),
      countsOfAllLanguages: fromBuckets(state.results.aggregations.Language.buckets),
      selectedPublishers: [],
      selectedYears: [],
      selectedAuthors: [],
      selectedLanguages: [],
      selectedPublishersForLastFiltering: [],
      selectedYearsForLastFiltering: [],
      selectedAuthorsForLastFiltering: [],
      selectedLanguagesForLastFiltering: []
    }
  },
  updateFacetsModel (state) {
    
    function anyFacetValuesAddedOrOmitted(lastSelection, currentSelection) {
      return {
        added: !currentSelection.every(e => lastSelection.includes(e)),
        omitted: !lastSelection.every(e => currentSelection.includes(e))
      }
    }
    
    function updatedCounts (counts, buckets, invalidPreviousCounts, converter = x => x) {
      let updated_counts = {}
      if (!invalidPreviousCounts) {
        Object.keys(counts).forEach(k => { updated_counts[k] = 0 })
      }
      buckets.forEach(x => { updated_counts[converter(x.key)] = x.doc_count })
      return updated_counts
    }

    let fm = state.facetsModel
    let publishersValues = anyFacetValuesAddedOrOmitted(fm.selectedPublishersForLastFiltering, fm.selectedPublishers)
    let authorsValues = anyFacetValuesAddedOrOmitted(fm.selectedAuthorsForLastFiltering, fm.selectedAuthors)
    let yearsValues = anyFacetValuesAddedOrOmitted(fm.selectedYearsForLastFiltering, fm.selectedYears)
    let languagesValues = anyFacetValuesAddedOrOmitted(fm.selectedLanguagesForLastFiltering, fm.selectedLanguages)
    let invalidPreviousCounts = publishersValues.omitted || authorsValues.omitted || yearsValues.omitted || languagesValues.omitted

    if (publishersValues.omitted || publishersValues.added) {
      fm.countsOfAllPublishers = updatedCounts(fm.countsOfAllPublishers, state.results.aggregations.Publisher.buckets, invalidPreviousCounts)
    }
    if (authorsValues.omitted || authorsValues.added) {
      fm.countsOfAllAuthors = updatedCounts(fm.countsOfAllAuthors, state.results.aggregations.Creator.buckets, invalidPreviousCounts)
    }
    if (yearsValues.omitted || yearsValues.added) {
      fm.countsOfAllYears = updatedCounts(fm.countsOfAllYears, state.results.aggregations.PublicationYear.buckets, invalidPreviousCounts, x => new Date(x).getYear() + 1900)
    }
    if (languagesValues.omitted || languagesValues.added) {
      fm.countsOfAllLanguages = updatedCounts(fm.countsOfAllLanguages, state.results.aggregations.Language.buckets, invalidPreviousCounts)
    }
    
    // save current facets
    fm.selectedPublishersForLastFiltering = fm.selectedPublishers.slice(0)
    fm.selectedYearsForLastFiltering = fm.selectedYears.slice(0)
    fm.selectedAuthorsForLastFiltering = fm.selectedAuthors.slice(0)
    fm.selectedLanguagesForLastFiltering = fm.selectedLanguages.slice(0)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
