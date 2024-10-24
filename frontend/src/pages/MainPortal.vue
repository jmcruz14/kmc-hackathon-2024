<template>
  <Ribbon></Ribbon>

  <!-- CONTENT HERE -->

  <NavBar v-if="type === 'applicant'">
    <span class="text-xl">Applications</span>
    <span class="text-xl">Openings</span>
    <span class="text-xl">Schedule</span>
    <span class="text-xl">Profile</span>
  </NavBar>
  <NavBar v-if="type === 'employer'">
    <span class="text-xl">Dashboard</span>
    <span class="text-xl">Applications</span>
    <span class="text-xl">Schedule</span>
    <!-- <span class="text-xl">Job Application Profile</span> -->
  </NavBar>
</template>

<script>
import Ribbon from '@/components/Ribbon.vue';
import NavBar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

export default {
  components: {
    Ribbon,
    NavBar
  },
  setup () {
    const route = useRoute()
    const type = computed(() => route?.query?.type)
    console.warn(route)

    return {
      type
    }
  }
}

</script>