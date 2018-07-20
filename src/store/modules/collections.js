/**
 * Copyright 2018 Alvaro Aguilera
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
  collectionList: [],
  dataSetsIDs: []
}

const getters = {
  getCollectionList: state => {
    return state.collectionList
  }
}

const mutations = {
  addCollection (state, collection) {
    state.collectionList.push(collection)
  },
  refreshCollections (state) {
    state.collectionList = []
    var self = this
    axios.get('/api/v1/collections/' + usercookie.getUsername())
      .then(function (response) {
        response.data
        .forEach(function (elem) {
          state.collectionList.push({'id': elem._id, 'name': elem.name})
        })
      })
      .catch(function (error) {
        self.errMsg = error.response
        console.log(error)
      })
  }
}

export default {
  state,
  getters,
  mutations
}
