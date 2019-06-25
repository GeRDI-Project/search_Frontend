/**
 * Copyright 2018 Nelson Tavares de Sousa, Alvaro Aguilera, Ingo Thomsen
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
import Vue from 'vue'
import Vuex from 'vuex'

import searchModule from './modules/search'
import collectionsModule from './modules/collections'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-state',
  storage: window.localStorage
})

export const store = new Vuex.Store({
  modules: {
    search: searchModule,
    collections: collectionsModule
  },
  plugins: [vuexLocalStorage.plugin]
})
