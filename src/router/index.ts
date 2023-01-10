import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddToDo from '../views/AddToDo.vue'
import Images from '../views/Images.vue'
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
    },
    {
      path: '/images',
      name: 'images',
      component: Images
    }
  ]
})

export default router
