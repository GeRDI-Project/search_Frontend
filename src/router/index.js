import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultList from '@/components/SearchResultList'
import SearchFacetes from '@/components/SearchFacetes'
import NavMenu from '@/components/NavMenu'
import SearchMask from '@/components/SearchMask'

Vue.use(Router)
Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-list', SearchResultList)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    }
  ]
})
