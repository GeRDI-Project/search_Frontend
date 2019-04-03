/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// Search Components
import Results from '@/components/Results'

// Statical UI Elements Components
import Start from '@/components/Start'

Vue.use(Router)

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
  }
  ]
})
