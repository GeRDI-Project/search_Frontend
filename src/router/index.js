import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultList from '@/components/SearchResultList'
import SearchFacetes from '@/components/SearchFacetes'
import NavMenu from '@/components/NavMenu'
import SearchMask from '@/components/SearchMask'
import Start from '@/components/Start'
import AppFooter from '@/components/AppFooter'
import PaginationBar from '@/components/PaginationBar'

Vue.use(Router)
Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-list', SearchResultList)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)
Vue.component('app-footer', AppFooter)
Vue.component('pagination-bar', PaginationBar)

export default new Router({
  routes: [
    {
      path: '/results',
      name: 'results',
      component: Results
    },
    {
      path: '/',
      name: 'start',
      component: Start
    }
  ]
})
