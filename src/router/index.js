/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// Search Components
import SearchMask from '@/components/SearchMask'
import Results from '@/components/Results'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultEntryMenu from '@/components/SearchResultEntryMenu'
import SearchFacetes from '@/components/SearchFacetes'
import PaginationBar from '@/components/PaginationBar'

// Bookmark Components
import Collections from '@/components/Collections'
import BookmarkListEntry from '@/components/BookmarkListEntry'

// Statical UI Elements Components
import NavMenu from '@/components/NavMenu'
import AppFooter from '@/components/AppFooter'
import Start from '@/components/Start'

Vue.use(Router)

Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-entry-menu', SearchResultEntryMenu)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)
Vue.component('app-footer', AppFooter)
Vue.component('pagination-bar', PaginationBar)
Vue.component('collections', Collections)
Vue.component('bookmark-list-entry', BookmarkListEntry)

export default new Router({
  routes: [{
    path: '/results',
    name: 'results',
    component: Results
  },
  {
    path: '/',
    name: 'start',
    component: Start
  },
  { path: '/bookmark',
    name: 'collections',
    component: Collections,
    }
  ]
})
