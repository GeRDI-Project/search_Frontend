import Vue from 'vue'
import Router from 'vue-router'
// import TestComponent from '@/components/TestComponent'
import MinimalAxiosComponent from '@/components/MinimalAxiosComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MinimalAxiosComponent',
      component: MinimalAxiosComponent
    }
  ]
})
