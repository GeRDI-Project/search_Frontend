import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results'
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
  }
  ]
})
