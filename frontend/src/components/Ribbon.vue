<template>
  <NavBar location="top">
    <div class="flex justify-between w-full">
      <span class="text-2xl font-extrabold">Bridgette</span>
      <ThemeController></ThemeController>
    </div>
  </NavBar>
</template>

<script>
import NavBar from './NavBar.vue';
import ThemeController from './ThemeController.vue';

export default {
  components: {
    // Card,
    NavBar,
    ThemeController
  },
  setup () {
    return {}
  }
}

</script>