/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// Search Components
import SearchMask from '@/components/SearchMask'
import Results from '@/components/Results'
import SearchResultEntry from '@/components/SearchResultEntry'
import SearchResultEntryMenu from '@/components/SearchResultEntryMenu'
import SearchResultList from '@/components/SearchResultList'
import SearchFacetes from '@/components/SearchFacetes'
import PaginationBar from '@/components/PaginationBar'

// Bookmark Components
import Bookmarks from '@/components/Bookmarks'
import BookmarkList from '@/components/BookmarkList'
import BookmarkListEntry from '@/components/BookmarkListEntry'

// Statical UI Elements Components
import NavMenu from '@/components/NavMenu'
import AppFooter from '@/components/AppFooter'
import Start from '@/components/Start'

Vue.use(Router)

Vue.component('search-result-entry', SearchResultEntry)
Vue.component('search-result-entry-menu', SearchResultEntryMenu)
Vue.component('search-result-list', SearchResultList)
Vue.component('search-facetes', SearchFacetes)
Vue.component('nav-menu', NavMenu)
Vue.component('search-mask', SearchMask)
Vue.component('app-footer', AppFooter)
Vue.component('pagination-bar', PaginationBar)

export default new Router({
  mode: 'history',
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
  { path: '/bookmarks',
    name: 'bookmarks',
    component: Bookmarks,    
    }
  ]
})
