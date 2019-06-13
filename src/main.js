// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { sharedUI } from 'shared-ui'
import axios from 'axios'
import Results from '@/components/Results'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultEntryMenu from '@/components/SearchResultEntryMenu'
import SearchFacets from '@/components/SearchFacets'
import SearchMask from '@/components/SearchMask'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { store } from './store/store'

library.add(faChevronUp, faChevronDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// register shared-ui components
Vue.use(sharedUI, { store: store })
// register components globally
Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-entry-menu', SearchResultEntryMenu)
Vue.component('search-facets', SearchFacets)
Vue.component('search-mask', SearchMask)
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
