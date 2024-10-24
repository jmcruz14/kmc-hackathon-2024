<template>
  <div class="w-[100vw] h-full flex flex-col justify-center items-center bg-gray-400">
    <div class="card w-1/2 m-2 p-4 bg-slate-300 shadow-lg">
      <div class="card-body">
        <h1 class="card-title text-lg font-bold">Looking for something?</h1>
        <div class="mt-4 space-y-4">
          <RouterLink :to="{ path: 'main', query: { type: 'applicant'}}" class="btn btn-primary w-full text-white">Looking for a Job</RouterLink>
          <RouterLink :to="{ path: 'main', query: { type: 'employer'}}" class="btn btn-secondary w-full text-white">Looking for Talent</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  setup () { 
    return {

    }
  }
}

</script>