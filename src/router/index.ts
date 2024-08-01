import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import MovieList from '../views/MovieList.vue'

const routes = [
  {
    path: '/',
    queryObjects: {},
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/movies/:id',
    name: 'MovieDetails',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MovieDetails.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
