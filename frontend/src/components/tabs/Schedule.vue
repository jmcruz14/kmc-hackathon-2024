<template>
  <div class="max-w-3xl mx-auto p-4">
    <!-- Time slots with meetings -->
    <div class="relative">
      <!-- Time markers -->
      <div class="absolute left-0 top-0 w-16 h-full">
        <div v-for="hour in timeSlots" :key="hour" class="h-32 relative">
          <span class="absolute -top-3 text-sm font-medium text-base-content/70">
            {{ formatHour(hour) }}
          </span>
        </div>
      </div>

      <!-- Timeline with meetings -->
      <div class="ml-16 space-y-2 relative">
        <!-- Dotted timeline -->
        <div class="absolute left-0 top-0 w-px h-full border-l border-base-300 border-dashed"></div>

        <!-- Meeting cards -->
        <div v-for="meeting in meetings" :key="meeting.id" 
          class="relative rounded-xl p-4 transition-all duration-200"
          :class="[
            meeting.status === 'ongoing' ? 'bg-warning/20' : 'bg-base-200',
            'hover:shadow-md'
          ]"
        >
          <div class="flex items-center justify-between">
            <!-- Left side with avatar and info -->
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                  <img
                    v-if="meeting.avatar"
                    :src="meeting.avatar"
                    :alt="meeting.name"
                    class="rounded-full"
                  />
                  <span v-else class="text-lg font-semibold">
                    {{ meeting.name[0] }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-base-content">{{ meeting.name }}</h3>
                <p class="text-sm text-base-content/60">{{ meeting.role }}</p>
              </div>
            </div>

            <!-- Right side with time and company -->
            <div class="flex items-center gap-4">
              <span class="text-sm" :class="[
                meeting.status === 'ongoing' ? 'text-warning-content' : 'text-primary'
              ]">
                {{ meeting.status === 'ongoing' ? 'Ongoing' : meeting.time }}
              </span>
              <div class="flex items-center gap-2">
                <span class="text-base-content/70">Heywork</span>
                <button class="btn btn-circle btn-sm btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Time slots from 8:00 to 14:00
const timeSlots = ref([8,9,10,11,12,13,14,15,16,17,18,19,20])

// Sample meetings data
const meetings = ref([
  {
    id: 1,
    name: 'Monica Simpson',
    role: 'Product Owner',
    time: '8:00 - 9:00',
    status: 'scheduled',
    avatar: null
  },
  {
    id: 2,
    name: 'Robert Smith',
    role: 'Product Owner',
    time: '10:00 - 11:00',
    status: 'ongoing',
    avatar: null
  },
  {
    id: 3,
    name: 'Robert White Junior',
    role: 'Account Manager',
    time: '12:30 - 13:30',
    status: 'scheduled',
    avatar: null
  },
  {
    id: 4,
    name: 'Michael Johansson',
    role: 'UI/UX Designer',
    time: '13:00 - 14:00',
    status: 'scheduled',
    avatar: '/path-to-avatar.jpg'
  }
])

// Format hour to display
const formatHour = (hour) => {
  return `${hour}:00`
}
</script>

<style scoped>
/* Optional: Add custom styles for timeline dots or other elements */
.timeline-dot {
  @apply absolute -left-1.5 w-3 h-3 rounded-full bg-base-300;
}

/* Ensure meeting cards hover state is smooth */
.meeting-card {
  @apply transition-all duration-200;
}
</style>