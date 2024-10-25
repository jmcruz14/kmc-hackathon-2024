<template>
  <div class="card border-[1px] border-slate-400 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
    <div class="card-body p-6">
      <!-- Header with Company Logo and Title -->
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <img
            v-if="company.logo"
            :src="company.logo"
            :alt="company.name"
            class="w-8 h-8"
          />
          <span v-else class="text-xl font-bold text-primary">
            {{ company.name[0] }}
          </span>
        </div>
        <div>
          <h2 class="card-title text-lg font-bold">{{ title }}</h2>
          <p class="text-base-content/60">{{ company.name }}</p>
        </div>
      </div>

      <!-- Job Stats -->
      <div class="flex gap-4 mt-4">
        <div class="flex items-center gap-2">
          <i class="bi bi-briefcase text-base-content/60"></i>
          <span>{{ applications }} applications</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="bi bi-clock text-base-content/60"></i>
          <span>{{ postedTime }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-4">
        <div 
          v-for="tag in tags" 
          :key="tag"
          class="badge badge-ghost"
        >
          {{ tag }}
        </div>
        <div v-if="additionalTags > 0" class="badge badge-primary">
          +{{ additionalTags }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  company: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      logo: ''
    })
  },
  applications: {
    type: Number,
    default: 0
  },
  postedTime: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  additionalTags: {
    type: Number,
    default: 0
  }
})
</script>