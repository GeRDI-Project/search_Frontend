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
  getResults: state => {
    if (state.results.hits) {
      return state.results.hits.hits
    }
    return []
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
  }
}

// actions
const actions = {
  search({ commit, state }, payload) {
    let querystring = payload.query
    let currentPage = payload.currentPage
    commit('setQueryPayload', payload)
    commit('setResults', [])
    var url = '/api/search?'
    if (currentPage) {
      url = url.concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage)
    }
    url = url.concat('&size=').concat(state.numDocsPerPage)
    axios.post(url,
      querybuilder.buildQuery(querystring, {}))
    .then(function(response) {
      commit('setResults', response.data);
      commit('initFacetsModel');
    })
    .catch(function(error) {
        console.log(error)
    });
  },
  filter({ commit, state }, facetsModel) {
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
      commit('setResults', response.data);
      commit('updateFacetsModel');
    })
    .catch(function(error) {
      console.log(error)
    });
  }
}

// mutations
const mutations = {
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
    function fromBuckets (buckets, converter= x => x) {
      var res = {};
      buckets.forEach( x => res[converter(x.key)] = x.doc_count);
      return res;
    }
    state.facetsModel = {
      countsOfAllPublishers: fromBuckets(state.results.aggregations.Publisher.buckets),
      countsOfAllAuthors: fromBuckets(state.results.aggregations.Creator.buckets),
      countsOfAllYears: fromBuckets(state.results.aggregations.PublicationYear.buckets, x => new Date(x).getYear() + 1900),
      countsOfAllLanguages:  fromBuckets(state.results.aggregations.Language.buckets),
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
    function setCountsToNullAndUpdate (currentSelection, lastSelection, counts, buckets, converter) {
      if (lastSelection.length == currentSelection.length && lastSelection.every(e => currentSelection.includes(e))) {
        console.log(currentSelection);
        Object.keys(counts).forEach(k => counts[k] = 0);
        buckets.forEach(x => {counts[converter(x.key)] = x.doc_count})
      }
    }
    var fm = state.facetsModel;
    setCountsToNullAndUpdate(fm.selectedPublishers, fm.selectedPublishersForLastFiltering, fm.countsOfAllPublishers, state.results.aggregations.Publisher.buckets);
    setCountsToNullAndUpdate(fm.selectedAuthors,    fm.selectedAuthorsForLastFiltering,    fm.countsOfAllAuthors,    state.results.aggregations.Creator.buckets);
    setCountsToNullAndUpdate(fm.selectedLanguages,  fm.selectedLanguagesForLastFiltering,  fm.countsOfAllLanguages,  state.results.aggregations.Language.buckets);
    setCountsToNullAndUpdate(fm.selectedYears,      fm.selectedYearsForLastFiltering,      fm.countsOfAllYears,      state.results.aggregations.PublicationYear.buckets, x => new Date(x).getYear() + 1900);
    // save current facets
    fm.selectedPublishersForLastFiltering = fm.selectedPublishers.slice(0);
    fm.selectedYearsForLastFiltering = fm.selectedYears.slice(0);
    fm.selectedAuthorsForLastFiltering = fm.selectedAuthors.slice(0);
    fm.selectedLanguagesForLastFiltering = fm.selectedLanguages.slice(0);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
