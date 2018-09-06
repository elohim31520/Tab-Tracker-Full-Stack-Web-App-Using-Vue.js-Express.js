import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register"
import Login from "../components/Login"
import Songs from "../components/Songs"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'songs',
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
    }

  ]
})
