/**
 * Copyright 2018 Alvaro Aguilera, Nelson Tavares de Sousa
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
import usercookie from '../../util/usercookie.js'

const state = {
  collectionList: []
}

const getters = {
  getCollectionList: state => {
    return state.collectionList
  },
  getCollectionById: (state) => (collectionId) => {
    return state.collectionList.find(collection => collection.id === collectionId)
  }
}

const mutations = {
  addCollection (state, collection) {
    state.collectionList.push(collection)
  }
}

// actions
const actions = {
  createBookmark({ commit, state }, payload) {
      const data = {
          name: payload.collectionName,
          docs: [payload.docID]
        }
      axios.post('/api/v1/collections/' + usercookie.getUsername(), data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          data.id = response.data.collectionId
          commit("addCollection", data)
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    updateCollection({ commit, state }, payload) {
      const collection = this.getters.getCollectionById(payload.collectionID)
      collection.docs.push(payload.docID)
      axios.put('/api/v1/collections/' + usercookie.getUsername() + '/' + collection.id, collection, {
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    refreshCollections (state) {
      console.log("FRESH PRINCE OF BEL AIR")
      state.collectionList = []
      var self = this
      axios.get('/api/v1/collections/' + usercookie.getUsername())
      .then(function (response) {
        response.data.forEach(function (elem) {
          var collectionDocs = []
          axios.get('/api/v1/collections/' + usercookie.getUsername() + '/' + elem._id)
            .then(function (subresponse) {
              subresponse.data.forEach(function (doc) {
                collectionDocs.push(doc._id)
              })
              self.commit("addCollection",{'id': elem._id, 'name': elem.name, 'docs': collectionDocs})
            })
        })
          .catch(function (error) {
            self.errMsg = error.response
            console.log(error)
          })
      })
    }
  }


export default {
  state,
  getters,
  mutations,
  actions
}
