<template>
  <Ribbon></Ribbon>

  <!-- CONTENT HERE -->
  <div class="h-full p-1 m-1 flex flex-col gap-2 overflow-y-scroll">
    <component :is="activeComponent[activeTab]" />
  </div>

  <NavBar v-if="type === 'applicant'">
    <!-- !-- Applications Button -->
      <button 
        class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
        :class="{ 'text-primary font-bold': currentRoute === 'applications' }"
        @click="navigateTo('applications')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span class="text-lg">Applications</span>
        <div class="ml-auto">
          <div v-if="unreadApplications" class="badge badge-primary badge-sm">{{ unreadApplications }}</div>
        </div>
      </button>

      <!-- Openings Button -->
      <button 
        class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
        :class="{ 'text-primary font-bold': currentRoute === 'openings' }"
        @click="navigateTo('openings')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-lg">Openings</span>
        <div class="ml-auto">
          <div v-if="newOpenings" class="badge badge-accent badge-sm">{{ newOpenings }}</div>
        </div>
      </button>

      <!-- Schedule Button -->
      <button 
        class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
        :class="{ 'text-primary font-bold': currentRoute === 'schedule' }"
        @click="navigateTo('schedule')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-lg">Schedule</span>
        <div class="ml-auto">
          <div v-if="upcomingInterviews" class="badge badge-secondary badge-sm">{{ upcomingInterviews }}</div>
        </div>
      </button>

      <!-- Profile Button -->
      <button 
        class="btn btn-ghost   gap-4 hover:bg-base-300 transition-colors duration-200"
        :class="{ 'text-primary font-bold': currentRoute === 'profile' }"
        @click="navigateTo('profile')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-lg">Profile</span>
        <div class="ml-auto">
          <div v-if="profileCompletion < 100" class="badge badge-warning badge-sm">{{ profileCompletion }}%</div>
        </div>
      </button>
  </NavBar>

  <NavBar v-if="type === 'employer'">
    <button 
      class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
      :class="{ 'text-primary font-bold': currentRoute === 'dashboard' }"
      @click="navigateTo('employer-dashboard')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <span class="text-lg">Dashboard</span>
      <div class="ml-auto">
        <div v-if="pendingTasks" class="badge badge-primary badge-sm">{{ pendingTasks }}</div>
      </div>
    </button>

    <!-- Applications Button -->
    <button 
      class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
      :class="{ 'text-primary font-bold': currentRoute === 'applications' }"
      @click="navigateTo('applications')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <span class="text-lg">Applications</span>
      <div class="ml-auto">
        <div v-if="newApplications" class="badge badge-accent badge-sm">{{ newApplications }}</div>
      </div>
    </button>

    <!-- Schedule Button -->
    <button 
      class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
      :class="{ 'text-primary font-bold': currentRoute === 'schedule' }"
      @click="navigateTo('schedule')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-lg">Schedule</span>
      <div class="ml-auto">
        <div v-if="scheduledInterviews" class="badge badge-secondary badge-sm">{{ scheduledInterviews }}</div>
      </div>
    </button>

    <!-- Settings Button -->
    <!-- <button 
      class="btn btn-ghost gap-4 hover:bg-base-300 transition-colors duration-200"
      :class="{ 'text-primary font-bold': currentRoute === 'settings' }"
      @click="navigateTo('settings')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="text-lg">Settings</span>
    </button> -->
  </NavBar>
</template>

<script>
import Ribbon from '@/components/Ribbon.vue';
import NavBar from '@/components/NavBar.vue';
import JobListings from '@/components/tabs/JobListings.vue';
import Schedule from '@/components/tabs/Schedule.vue';
import ApplicationStatuses from '@/components/tabs/ApplicationStatuses.vue';
import ProfileView from '@/components/tabs/ProfileView.vue';

import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import EmployerDashboard from '../components/tabs/EmployerDashboard.vue';

export default {
  components: {
    Ribbon,
    NavBar,
    JobListings,
    Schedule,
    ProfileView,
    EmployerDashboard
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const type = computed(() => route?.query?.type);

    const unreadApplications = ref(5)
    const newOpenings = ref(3)
    const upcomingInterviews = ref(2)
    const profileCompletion = ref(85)

    const activeTab = ref('applications');
    const activeComponent = {
      'applications': ApplicationStatuses,
      'openings': JobListings,
      'schedule': Schedule,
      'profile': ProfileView,
      'employer-dashboard': EmployerDashboard
    }

    const currentHash = computed(() => {
      return route.hash.slice(1) || 'applications'
    })

    // Navigation function using Vue Router
    const navigateTo = (hash) => {
      activeTab.value = hash;
      // Preserve current route and just update the hash
      router.push({
        ...route,
        hash: `#${hash}`
      })
    }

    
    // "fetch" job listings

    return {
      type,
      currentHash,

      unreadApplications,
      newOpenings,
      upcomingInterviews,
      profileCompletion,
      
      activeTab,
      activeComponent,

      navigateTo
    }
  }
}

</script>