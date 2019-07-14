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
import router from '../../router'

/* eslint-disable */

const constant = {
  facets: ["publisher", "author", "year", "language"],
}

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
  availableFacets: state => {
    return constant.facets
  },
  facetTitle: state => (facet) => {
    switch (facet) {
    case "publisher": return "Publisher"; break;
    case "author": return "Author"; break;
    case "year": return "Publication Year"; break;
    case "language": return "Language"; break;
    }
  },
  selectedConstraints: state => (facet) => {
    switch (facet) {
      case "publisher": return state.facetsModel.selectedPublishers; break;
      case "author": return state.facetsModel.selectedAuthors; break;
      case "year": return state.facetsModel.selectedYears; break;
      case "language": return state.facetsModel.selectedLanguages; break;
    }
  },
  constraintCounts: state => (facet) => {    
    switch (facet) {
      case "publisher": return state.facetsModel.countsOfAllPublishers; break;
      case "author": return state.facetsModel.countsOfAllAuthors; break;
      case "year": return state.facetsModel.countsOfAllYears; break;
      case "language": return state.facetsModel.countsOfAllLanguages; break;   }
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
  getSelectedFacetValues: state => {
    var ret = {}
    var fm = state.facetsModel
    if (fm.selectedPublishers.length > 0) ret.selectedPublishers = fm.selectedPublishers
    if (fm.selectedAuthors.length > 0) ret.selectedAuthors = fm.selectedAuthors
    if (fm.selectedYears.length > 0) ret.selectedYears = fm.selectedYears
    if (fm.selectedLanguages.length > 0) ret.selectedLanguages = fm.selectedLanguages
    return ret
  },
  areAnyConstraintsSelected: state => {
    return state.facetsModel.selectedPublishers.length || state.facetsModel.selectedAuthors.length || state.facetsModel.selectedYears.length || state.facetsModel.selectedLanguages.length
  },
  areAnyFacetFilteringApplied: state => {
    return state.facetsModel.selectedPublishersForLastFiltering.length || state.facetsModel.selectedAuthorsForLastFiltering.length || state.facetsModel.selectedYearsForLastFiltering.length || state.facetsModel.selectedLanguagesForLastFiltering.length
  }
}

// actions
const actions = {
  search({ commit, state }, payload) {
    var querystring = payload.query
    var currentPage = payload.currentPage
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
          // initFacetsModel
          commit('setSelectedFacetValuesForLastFiltering', {})
          commit('setSelectedFacetValues', {})
          commit('getCountsFromResults')
          commit('setSearchingStatus', false)
        })
        .catch(function (error) {
          console.log(error)
          commit('setSearchingStatus', false)
        })
    }
  },
  filter({ commit, state }, getCountsFromResults = false) {
    commit('setSearchingStatus', true)
    var currentPage = state.queryPayload.currentPage
    commit('setResults', [])
    var url = '/api/search?'
    if (currentPage) {
      url = url.concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage)
    }
    url = url.concat('&size=').concat(state.numDocsPerPage)
    axios.post(url,
      querybuilder.buildQuery(state.queryPayload.query, state.facetsModel))
    .then(function(response) {
      commit('setResults', response.data)
      if (getCountsFromResults) {
        commit('getCountsFromResults')
      }
      commit('updateFacetsModel')
      commit('setSearchingStatus', false)
    })
    .catch(function(error) {
      console.log(error)
      commit('setSearchingStatus', false)
    })
    var new_query = {
      q: router.currentRoute.query.q
    }
    if (this.getters.areAnyConstraintsSelected) {
      new_query.s = encodeURIComponent(JSON.stringify(this.getters.getSelectedFacetValues))
    }
    router.push({
      query: new_query
    })
  },
  resetState({commit, state}) {
    commit('setResults', [])
    commit('setQueryPayload', [])
    commit('setSelectedFacetValues', {})
    commit('setSelectedFacetValuesForLastFiltering', {})
    state.facetsModel.countsOfAllPublishers = {}
    state.facetsModel.countsOfAllYears = {}
    state.facetsModel.countsOfAllAuthors = {}
    state.facetsModel.countsOfAllLanguages = {}
  }
}

// mutations
const mutations = {
  setSelectedConstraints (state, payload) {
    var facet = payload.facet
    var arr = payload.arr
    switch (facet) {
      case "publisher": state.facetsModel.selectedPublishers = Array.isArray(arr) ? arr : []; break; 
      case "author": state.facetsModel.selectedAuthors = Array.isArray(arr) ? arr : []; break; 
      case "year": state.facetsModel.selectedYears = Array.isArray(arr) ? arr : []; break; 
      case "language": state.facetsModel.selectedLanguages = Array.isArray(arr) ? arr : []; break; 
    }    
  },
  clearFacetConstraints(state, facet) {
    switch (facet) {
      case "publisher": state.facetsModel.selectedPublishers = []; break;
      case "author": state.facetsModel.selectedAuthors = []; break;
      case "year": state.facetsModel.selectedYears = []; break;
      case "language": state.facetsModel.selectedLanguages = []; break;  
    }
  },
  setSelectedFacetValues (state, values) {
    helper.setArrayOrEmpty("selectedPublishers", values)
    helper.setArrayOrEmpty("selectedAuthors", values)
    helper.setArrayOrEmpty("selectedYears", values)
    helper.setArrayOrEmpty("selectedLanguages", values)
  },
  setSelectedFacetValuesForLastFiltering (state, values) {
    helper.setArrayOrEmpty("selectedPublishersForLastFiltering", values)
    helper.setArrayOrEmpty("selectedAuthorsForLastFiltering", values)
    helper.setArrayOrEmpty("selectedYearsForLastFiltering", values)
    helper.setArrayOrEmpty("selectedLanguagesForLastFiltering", values)
  },
  setSearchingStatus (state, bool) {
    state.isSearching = bool
  },
  setResults (state, results) {
    state.results = results
  },
  setQueryPayload (state, payload) {
    state.queryPayload = payload
  },
  getCountsFromResults (state) {
    state.facetsModel.countsOfAllPublishers = helper.facetValueCountsfromBuckets(state.results.aggregations.Publisher.buckets)
    state.facetsModel.countsOfAllAuthors = helper.facetValueCountsfromBuckets(state.results.aggregations.Creator.buckets)
    state.facetsModel.countsOfAllYears = helper.facetValueCountsfromBuckets(state.results.aggregations.PublicationYear.buckets, x => new Date(x).getYear() + 1900)
    state.facetsModel.countsOfAllLanguages = helper.facetValueCountsfromBuckets(state.results.aggregations.Language.buckets)
  },
  updateFacetsModel (state) {
    var fm = state.facetsModel
    var publishersValues = helper.anyFacetValuesAddedOrOmitted(fm.selectedPublishersForLastFiltering, fm.selectedPublishers)
    var authorsValues = helper.anyFacetValuesAddedOrOmitted(fm.selectedAuthorsForLastFiltering, fm.selectedAuthors)
    var yearsValues = helper.anyFacetValuesAddedOrOmitted(fm.selectedYearsForLastFiltering, fm.selectedYears)
    var languagesValues = helper.anyFacetValuesAddedOrOmitted(fm.selectedLanguagesForLastFiltering, fm.selectedLanguages)
    var invalidPreviousCounts = publishersValues.omitted || authorsValues.omitted || yearsValues.omitted || languagesValues.omitted

    if (publishersValues.omitted || publishersValues.added || invalidPreviousCounts) {
      fm.countsOfAllPublishers = helper.updatedFacetValueCounts(fm.countsOfAllPublishers, state.results.aggregations.Publisher.buckets, invalidPreviousCounts)
    }
    if (authorsValues.omitted || authorsValues.added || invalidPreviousCounts) {
      fm.countsOfAllAuthors = helper.updatedFacetValueCounts(fm.countsOfAllAuthors, state.results.aggregations.Creator.buckets, invalidPreviousCounts)
    }
    if (yearsValues.omitted || yearsValues.added || invalidPreviousCounts) {
      fm.countsOfAllYears = helper.updatedFacetValueCounts(fm.countsOfAllYears, state.results.aggregations.PublicationYear.buckets, invalidPreviousCounts, x => new Date(x).getYear() + 1900)
    }
    if (languagesValues.omitted || languagesValues.added || invalidPreviousCounts) {
      fm.countsOfAllLanguages = helper.updatedFacetValueCounts(fm.countsOfAllLanguages, state.results.aggregations.Language.buckets, invalidPreviousCounts)
    }

    // save current facets
    mutations.setSelectedFacetValuesForLastFiltering(state, {
      selectedPublishersForLastFiltering: fm.selectedPublishers.slice(0),
      selectedYearsForLastFiltering: fm.selectedYears.slice(0),
      selectedAuthorsForLastFiltering: fm.selectedAuthors.slice(0),
      selectedLanguagesForLastFiltering: fm.selectedLanguages.slice(0)
    })
  }
}

const helper = {
  setArrayOrEmpty (key, values) {
    state.facetsModel[key] = Array.isArray(values[key]) ? values[key] : []
  },
  facetValueCountsfromBuckets (buckets, converter = x => x) {
    var res = {}
    buckets.forEach(x => { res[converter(x.key)] = x.doc_count })
    return res
  },
  anyFacetValuesAddedOrOmitted(lastSelection, currentSelection) {
    return {
      added: !currentSelection.every(e => lastSelection.includes(e)),
      omitted: !lastSelection.every(e => currentSelection.includes(e))
    }
  },
  updatedFacetValueCounts (counts, buckets, invalidPreviousCounts, converter = x => x) {
    var updated_counts = {}
    if (!invalidPreviousCounts) {
      Object.keys(counts).forEach(k => { updated_counts[k] = 0 })
    }
    buckets.forEach(x => { updated_counts[converter(x.key)] = x.doc_count })
    return updated_counts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
