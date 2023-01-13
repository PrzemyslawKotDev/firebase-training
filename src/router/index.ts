import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddToDo from '../views/AddItem.vue'
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
      path: '/addtodo',
      name: 'addtodo',
      component: AddToDo
    }
  ]
})

export default router
