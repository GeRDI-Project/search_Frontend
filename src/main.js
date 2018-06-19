// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import Results from '@/components/Results'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultEntryMenu from '@/components/SearchResultEntryMenu'
import SearchFacetes from '@/components/SearchFacetes'
import NavMenu from '@/components/NavMenu'
import SearchMask from '@/components/SearchMask'
import AppFooter from '@/components/AppFooter'
import PaginationBar from '@/components/PaginationBar'

import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// register components globally
Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-entry-menu', SearchResultEntryMenu)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)
Vue.component('app-footer', AppFooter)
Vue.component('pagination-bar', PaginationBar)
Vue.component('results', Results)

Vue.config.productionTip = false
axios.defaults.timeout = 10000;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
    result: ' '
    }
  },
  store: store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
