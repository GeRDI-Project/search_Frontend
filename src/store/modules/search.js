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

/* eslint-disable */
// initial state
const state = {
  results: {},
  queryPayload: {},
  numDocsPerPage: 10
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
  }
}

// actions
const actions = {
  search({ commit, state }, payload) {
    let q = payload.query
    let currentPage = payload.currentPage
    commit('setQueryPayload', payload)
    commit('setResults', [])
    var url = '/api/search?q='
    url = url.concat(encodeURIComponent(q))
    if (currentPage) {
      url = url.concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage)
    }
    url = url.concat('&size=').concat(state.numDocsPerPage)
    axios.post(url,
    {
      'aggs': {
        'PublicationYear': {
          'terms': {
            'field': 'publicationYear',
            'order' : { '_count' : 'desc' }
          }
        },
        'Publisher': {
          'terms': {
            'field': 'publisher.raw',
            'order' : { '_count' : 'desc' }
          }
        },
        'Creator': {
          'terms': {
            'field': 'creators.creatorName.value.raw',
            'order' : { '_count' : 'desc' }
          }
        },
        'Language': {
          'terms': {
            'field': 'language',
            'order' : { '_count' : 'desc' }
          }
        }
      }
    })
      .then(function(response) {
        commit('setResults', response.data)
      })
      .catch(function(error) {
        //self.errMsg = error.response;
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
