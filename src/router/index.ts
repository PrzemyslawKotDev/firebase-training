import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddItem from '../views/AddItem.vue'
import LogIn from '../views/LogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/additem',
      name: 'additem',
      component: AddItem
    }
  ]
})

export default router
