/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// Search Components
import Results from '@/components/search/Results'

// Bookmark Components
import Collections from '@/components/bookmark/Collections'

// Statical UI Elements Components
import Start from '@/components/Start'

Vue.use(Router)

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
