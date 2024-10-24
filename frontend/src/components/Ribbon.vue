<template>
  <NavBar location="top">
    <div class="flex justify-end w-full">
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