<template>
  <div class="h-full overflow-y-auto">
    <!-- Profile Header Card -->
    <div class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <div class="flex items-start gap-4">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img :src="profile.avatarUrl || '/api/placeholder/96/96'" :alt="profile.name" />
            </div>
          </div>
          <div class="flex-1">
            <h2 class="card-title text-2xl mb-1">{{ profile.name }}</h2>
            <div class="flex items-center gap-2 mb-2">
              <div class="badge badge-ghost">{{ profile.pronouns }}</div>
              <div class="badge badge-primary">{{ profile.status }}</div>
            </div>
            <p class="text-base-content/80">{{ profile.title }}</p>
          </div>
          <button class="btn btn-ghost btn-circle" @click="handleEdit">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title text-lg">Contact Information</h3>
          <button class="btn btn-ghost btn-sm" @click="toggleContactVisibility">
            {{ showContact ? 'Hide' : 'Show' }} Contact Info
          </button>
        </div>
        <div v-if="showContact" class="space-y-3">
          <div v-for="(contact, type) in profile.contactInfo" :key="type" 
               class="flex items-center gap-3">
            <div class="badge badge-ghost">{{ contactIcons[type] }}</div>
            <span>{{ contact.value }}</span>
            <div class="badge" :class="contact.available ? 'badge-success' : 'badge-ghost'">
              {{ contact.available ? 'Available' : 'Hidden' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div v-for="(skills, type) in profile.skills" :key="type" 
           class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">{{ type }}</h3>
          <div class="flex flex-wrap gap-2">
            <div v-for="skill in skills" :key="skill"
                 class="badge" 
                 :class="type === 'Technical Skills' ? 'badge-primary' : 'badge-secondary'">
              {{ skill }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Experience Timeline -->
    <div class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <h3 class="card-title text-lg mb-4">Work History</h3>
        <ul class="timeline timeline-vertical">
          <li v-for="job in profile.workHistory" :key="job.id">
            <div class="timeline-start">{{ job.period }}</div>
            <div class="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <circle cx="10" cy="10" r="10"/>
              </svg>
            </div>
            <div class="timeline-end timeline-box">
              <h4 class="font-bold">{{ job.title }}</h4>
              <p class="text-sm">{{ job.company }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Additional Information Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">Extra-curricular Activities</h3>
          <ul class="list-disc list-inside space-y-2">
            <li v-for="activity in profile.extraCurricular" :key="activity">
              {{ activity }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">Notice Period</h3>
          <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-bold">Available in {{ profile.noticePeriod.days }} days</h3>
              <div class="text-sm">Current notice period: {{ profile.noticePeriod.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ProfileView',
  
  setup() {
    const showContact = ref(false)

    const profile = reactive({
      name: 'Alex Chen',
      pronouns: 'they/them',
      status: 'Open to Work',
      title: 'Senior Full Stack Developer',
      avatarUrl: null,
      contactInfo: {
        email: { value: 'alex.chen@email.com', available: true },
        phone: { value: '+1 (555) 123-4567', available: true },
        linkedin: { value: 'linkedin.com/in/alexchen', available: true }
      },
      skills: {
        'Technical Skills': ['Vue.js', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript'],
        'Soft Skills': ['Project Management', 'Team Leadership', 'Communication', 'Problem Solving']
      },
      workHistory: [
        { 
          id: 1,
          period: '2021 - Present',
          title: 'Senior Developer',
          company: 'TechCorp Solutions'
        },
        {
          id: 2,
          period: '2018 - 2021',
          title: 'Full Stack Developer',
          company: 'Innovation Labs'
        }
      ],
      extraCurricular: [
        'Tech Meetup Organizer',
        'Open Source Contributor',
        'Hackathon Mentor',
        'Tech Blog Writer'
      ],
      noticePeriod: {
        days: 30,
        text: '1 month'
      }
    })

    const contactIcons = {
      email: '✉️',
      phone: '📱',
      linkedin: '💼'
    }

    const toggleContactVisibility = () => {
      showContact.value = !showContact.value
    }

    const handleEdit = () => {
      // Implement edit functionality
      console.log('Edit profile')
    }

    return {
      profile,
      showContact,
      contactIcons,
      toggleContactVisibility,
      handleEdit
    }
  }
}
</script>