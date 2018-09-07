import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register"
import Login from "../components/Login"
import Songs from "../components/Songs"
import CreateSong from '../components/CreateSong'
import ViewTheSong from '../components/ViewTheSong'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'create-song',
      component: CreateSong
    },
    {
      path: '/songs/:id',
      name: 'view-the-song',
      component: ViewTheSong
    }

  ]
})
