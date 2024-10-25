<template>
  <NavBar location="top">
    <div class="flex justify-between w-full">
      <div class="flex gap-4 items-center">
        <img src="../assets/bridgette_logo.svg" class="h-10 w-10  " />
        <span class="text-2xl font-extrabold">Bridgette</span>
      </div>
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
    ThemeController,
  },
  setup () {
    return {}
  }
}

</script>