// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import staticUI from 'static-ui'
import axios from 'axios'
import Results from '@/components/search/Results'
import SearchResultEntry from '@/components/search/SearchResultEntry'
import SearchResultEntryMenu from '@/components/search/SearchResultEntryMenu'
import SearchFacetes from '@/components/search/SearchFacetes'
import SearchMask from '@/components/search/SearchMask'
import NavMenu from '@/components/common/NavMenu'
// import AppFooter from '@/components/common/AppFooter'
// import PaginationBar from '@/components/common/PaginationBar'
import CollectionEntry from '@/components/bookmark/CollectionEntry'
// import DocumentMedia from '@/components/common/DocumentMedia'

import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// register static-ui component
Vue.use(staticUI)
// register components globally
Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-entry-menu', SearchResultEntryMenu)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)
// Vue.component('app-footer', AppFooter)
// Vue.component('pagination-bar', PaginationBar)
Vue.component('results', Results)
Vue.component('collection-entry', CollectionEntry)
// Vue.component('document-media', DocumentMedia)

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
  },
  created() {
    this.$store.dispatch('refreshCollections')
  }
})
