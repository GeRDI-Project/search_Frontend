import axios from 'axios'

/* eslint-disable */
// initial state
const state = {
  items: 0,
  results: [],
  aggs: {},
  totalFoundDocs: 0,
  numDocsPerPage: 10
}

// getters
const getters = {
  getResults: state => {
    return state.results
  },
  getAggregations: state => {
    return state.aggs
  }
}

// actions
const actions = {
  search({ commit, state }, payload) {
    let q = payload.query
    let currentPage = payload.currentPage
    commit('newResults', [])
    commit('newAggs', {})
    axios.post('/api/search?q='.concat(encodeURIComponent(q)).concat('&from=').concat(currentPage * state.numDocsPerPage - state.numDocsPerPage).concat('&size=').concat(state.numDocsPerPage),
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
        commit('newAggs', response.data.aggregations)
        commit('newResults', response.data.hits.hits)
      })
      .catch(function(error) {
        //self.errMsg = error.response;
        //console.log(error)
      });
  }
}

// mutations
const mutations = {
  newResults (state, results) {
    state.results = results
  },
  newAggs (state, aggs) {
    state.aggs = aggs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
