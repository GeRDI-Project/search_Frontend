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

const getUser = function (vm = null) {
  if (vm === null) return null
  if (vm.$gerdi.aai.getUser() !== null) { return vm.$gerdi.aai.getUser().sub }
  return null
}

const getPath = function (vm = null) {
  if (getUser(vm) === null) return null
  axios.defaults.headers.common = { 'Authorization': 'Bearer ' + vm.$gerdi.aai.getIdToken() }
  return '/api/v1/collections'
}

const state = {
  collectionList: null,
  isLoading: true
}

const getters = {
  getCollectionList: state => {
    return state.collectionList
  },
  isLoading: state => {
    return state.isLoading
  },
  getCollectionById: (state) => (collectionId) => {
    return state.collectionList.find(collection => collection.id === collectionId)
  },
  isBookmarked: (state) => (docId) => {
    return state.collectionList.filter(it => it.docs.includes(docId)).length > 0
  }
}

const mutations = {
  addCollection (state, collection) {
    if (state.collectionList === null) {
      state.collectionList = [collection]
      return
    }
    state.collectionList.push(collection)
  },
  setCollection (state, collection) {
    state.collectionList = collection
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  deleteCollection (state, collection) {
    var index = state.collectionList.indexOf(collection)
    if (index > -1) {
      state.collectionList.splice(index, 1)
    }
  }
}

// actions
const actions = {
  createBookmark ({commit, state}, payload) {
    const data = {
      name: payload.collectionName,
      docs: [payload.docID]
    }
    axios.post(getPath(payload.vm), data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      data.id = response.data.collectionId
      commit('addCollection', data)
    })
  },
  deleteCollection ({commit, state}, payload) {
    const collection = this.getters.getCollectionById(payload.collectionID)
    axios.delete(getPath(payload.vm) + '/' + collection.id)
    .then(function (response) {
      commit('deleteCollection', collection)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  updateCollection ({commit, state}, payload) {
    const collection = this.getters.getCollectionById(payload.collectionID)
    collection.docs.push(payload.docID)
    axios.put(getPath(payload.vm) + '/' + collection.id, collection, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  refreshCollections (state, { vm }) {
    var self = this
    if (getUser(vm) === null) return
    self.commit('setLoading', true)
    axios.get(getPath(vm))
    .then(function (response) {
      if (response.data.length === 0) self.commit('setCollection', [])
      response.data.forEach(async function (elem) {
        var collectionDocs = []
        const subresponse = await axios(getPath(vm) + '/' + elem._id)
        subresponse.data.forEach(function (doc) {
          collectionDocs.push(doc._id)
        })
        self.commit('addCollection', {'id': elem._id, 'name': elem.name, 'docs': collectionDocs})
      })
      self.commit('setLoading', false)
    })
    .catch(function (error) {
      console.error(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
