import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home';
import Meetups from '@/components/Meetup/Meetups';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Meetup from '@/components/Meetup/Meetup';
import Profile from '@/components/User/Profile';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Categories from '@/components/Category/Categories';
import Category from '@/components/Category/Category'

import { store } from '../store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
    props: true
    
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next()
      } else {
      next('/signin')
      }
    }
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup
  },
  {
    path: '/categorie',
    name: 'Categories',
    props: true,
    component: Categories
  },
  {
    path: '/categories/:id',
    name: 'Category',
    props: true,
    component: Category
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next()
      } else {
      next('/signin')
      }
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
