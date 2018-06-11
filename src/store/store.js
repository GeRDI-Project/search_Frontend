// just a example state management with vuex

import Vue from 'vue'
import Vuex from 'vuex'

import searchModule from './modules/search'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    search: searchModule
  }
})
