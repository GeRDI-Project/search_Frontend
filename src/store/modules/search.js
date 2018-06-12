/**
 * Copyright 2018 Nelson Tavares de Sousa
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
    selectedLanguages: []
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
      querybuilder.buildQuery(querystring, {}))//{selectedPublishers:['European Nucleotide Archive (ENA)', 'Esri'], selectedAuthors: ['Esri Inc.']})) // TODO: REMOVE
    .then(function(response) {
      commit('setResults', response.data)
    })
    .catch(function(error) {
      //self.errMsg = error.response;
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
      querybuilder.buildQuery(state.queryPayload.query, facetsModel))//{selectedPublishers:['European Nucleotide Archive (ENA)', 'Esri'], selectedAuthors: ['Esri Inc.']})) // TODO: REMOVE
    .then(function(response) {
      commit('setResults', response.data)
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
  updateFacetsModel (state, newModel) {
    state.facetsModel = newModel
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
