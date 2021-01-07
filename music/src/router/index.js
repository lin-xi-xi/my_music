import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Hot from '../views/Hot.vue'
import playlist from '../views/playlist.vue'
import Search from '../views/Search.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/home'
    
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{isShow:true}
  },
  {
    path: '/hot',
    name: 'Hot',
    component:Hot,
    meta:{isShow:true}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{isShow:true}
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: playlist,

  },
]

const router = new VueRouter({
  routes
})

export default router
