<script setup>
import Generic from '@/layouts/Generic.vue'
import WelcomeCard from './pages/WelcomeCard.vue';
import MainPortal from './pages/MainPortal.vue';
import NotFound from './pages/NotFound.vue';
import { computed, ref } from 'vue';
import Ribbon from './components/Ribbon.vue';

// const routes = {
//   '/': WelcomeCard,
//   '/main': MainPortal
// }
// const currentPath = ref(window.location.hash);
// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })
// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1) || '/' || NotFound]
// })

</script>

<template>
  <Generic>
    <RouterView />
    <!-- <component :is="currentView" /> -->
  </Generic>
</template>