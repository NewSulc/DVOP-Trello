import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SettingsView from '@/views/SettingsView.vue'
import BoardView from '@/views/BoardView.vue'
import ProjectView from '@/views/ProjectView.vue'
import UserView from '@/views/UserView.vue'
import Logout from '@/views/Logout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignUpView },
    { path: '/settings', component: SettingsView },
    { path: '/b/:boardId', component: BoardView },
    { path: '/projects', component: ProjectView},
    { path: '/user', component: UserView},
    { path: '/logout', component: Logout},
  ]
})

export default router
