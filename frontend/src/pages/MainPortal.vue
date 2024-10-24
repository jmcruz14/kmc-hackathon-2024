<template>
  <Ribbon></Ribbon>
  <NavBar>
    <span class="text-3xl">Job Application Profile</span>
  </NavBar>
</template>

<script>
import Ribbon from '@/components/Ribbon.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    Ribbon,
    NavBar
  },
  setup () {
    return {}
  }
}

</script>