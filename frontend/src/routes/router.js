import { createMemoryHistory, createRouter } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'

import WelcomeCard from '@/pages/WelcomeCard.vue';
import MainPortal from '@/pages/MainPortal.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  { path: '/', component: WelcomeCard },
  { path: '/main', component: MainPortal },
  { path: '/error', component: NotFound }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router