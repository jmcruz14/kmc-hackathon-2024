<template>
  <div 
    @click="openDialog"
    class="group bg-white hover:bg-base-100 rounded-xl p-6 mb-4 transition-all duration-200 
    shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
  >
    <div class="flex items-start gap-4">
      <!-- Company Logo -->
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <img
          v-if="company?.logo"
          :src="company.logo"
          :alt="company.name"
          class="w-8 h-8 object-contain"
        />
        <span v-else class="text-xl font-bold text-primary">
          {{ company?.name?.[0] }}
        </span>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <!-- Header -->
        <div class="flex justify-between items-start w-full">
          <div>
            <h3 class="text-lg font-semibold text-base-content group-hover:text-primary transition-colors">
              {{ title }}
            </h3>
            <p class="text-base-content/60">{{ company?.name }}</p>
          </div>
          
          <!-- Status Indicator -->
          <div class="flex items-center gap-2">
            <span :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2',
              statusStyles[status].bgColor,
              statusStyles[status].textColor
            ]">
              <span class="relative flex h-2 w-2">
                <span :class="[
                  'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                  statusStyles[status].pingColor
                ]"></span>
                <span :class="[
                  'relative inline-flex rounded-full h-2 w-2',
                  statusStyles[status].dotColor
                ]"></span>
              </span>
              {{ statusStyles[status].label }}
            </span>
          </div>
        </div>

        <!-- Application Info -->
        <div class="flex gap-4 mt-3 text-sm text-base-content/70">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Applied {{ appliedDate }}
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {{ lastUpdated }}
          </div>
        </div>

        <!-- Tags -->
        <!-- <div class="flex flex-wrap gap-2 mt-4">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="px-3 py-1 text-sm rounded-full bg-base-200 text-base-content/80"
          >
            {{ tag }}
          </span>
          <span 
            v-if="additionalTags"
            class="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
          >
            +{{ additionalTags }}
          </span>
        </div> -->
      </div>

    <!-- Status Details Dialog -->
    <dialog 
      ref="dialogRef"
      class="modal modal-bottom sm:modal-middle"
      @click="closeOnBackdropClick"
    >
      <div 
        class="modal-box"
      >
        <div class="flex justify-between items-start">
          <h3 class="font-bold text-lg mb-5">Status</h3>
          <!-- <button class="btn btn-sm btn-circle btn-ghost" @click="closeDialog">✕</button> -->
        </div>

        <!-- Status Icon -->
        <div class="flex justify-center mb-6">
          <div :class="[
            'rounded-full p-4 flex items-center gap-4',
            statusStyles[status].iconBgColor
          ]">
            <component 
              :is="statusStyles[status].icon" 
              class="w-[80px] h-[80px]"
              :class="statusStyles[status].textColor"
            />
            <div class="flex flex-col items-start">
              <h4 class="font-semibold mb-2">{{ statusStyles[status].detailsTitle }}</h4>
              <p class="text-sm">{{ statusStyles[status].details }}</p>
            </div>
          </div>
        </div>

        <!-- Status Message -->
        <div class="prose max-w-none">
          
          <!-- Requirements List -->
          <div v-if="requirements?.length > 0" class="mt-4">
            <h5 class="font-medium mb-2">Requirements Analysis:</h5>
            <ul class="space-y-2"> 
              <li 
                v-for="(req, index) in requirements" 
                :key="index"
                class="flex items-center gap-2"
              >
                <span :class="[
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
                  req.met ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                ]">
                  <component :is="req.met ? CheckIcon : XIcon" class="w-3 h-3" />
                </span>
                {{ req.description }}
              </li>
            </ul>
          </div>

          <!-- Next Steps -->
          <div class="mt-6 p-4 bg-base-200 rounded-lg">
            <h5 class="font-medium mb-2">Next Steps:</h5>
            <p>{{ statusStyles[status].nextSteps }}</p>
          </div>
        </div>
      </div>
    </dialog>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CheckIcon, XIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  company: {
    type: Object,
    default: () => ({
      name: '',
      logo: ''
    })
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ['pending', 'approved', 'rejected'].includes(value)
  },
  appliedDate: {
    type: String,
    required: true
  },
  lastUpdated: {
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

const dialogRef = ref(null)

const statusStyles = {
  pending: {
    label: 'Under Review',
    bgColor: 'bg-warning/20',
    textColor: 'text-warning-content',
    pingColor: 'bg-warning',
    dotColor: 'bg-warning',
    iconBgColor: 'bg-warning/20',
    icon: AlertCircleIcon,
    detailsTitle: 'Manual Review Required',
    details: 'Your application meets the basic requirements but requires additional review. Our hiring team will carefully evaluate your qualifications against the role requirements.',
    nextSteps: 'Please allow 2-3 business days for our team to review your application. You will be notified via email of any updates.'
  },
  approved: {
    label: 'Approved',
    bgColor: 'bg-success/20',
    textColor: 'text-success-content',
    pingColor: 'bg-success',
    dotColor: 'bg-success',
    iconBgColor: 'bg-success/20',
    icon: CheckCircleIcon,
    detailsTitle: "Passed Initial Screening",
    details: 'Your profile strongly matches our requirements for this position. Our AI system has verified that you exceed the minimum qualifications.',
    nextSteps: 'Our hiring team will reach out within 24 hours to schedule your first interview. Please monitor your email for further instructions.'
  },
  rejected: {
    label: 'Not Selected',
    bgColor: 'bg-error/20',
    textColor: 'text-error-content',
    pingColor: 'bg-error',
    dotColor: 'bg-error',
    iconBgColor: 'bg-error/20',
    icon: XCircleIcon,
    detailsTitle: 'Application Not Proceeding',
    details: 'Based on our AI screening process, we found that your current profile does not meet some of our minimum requirements for this position.',
    nextSteps: 'We encourage you to review our job requirements and apply for positions that better match your current qualifications. You may reapply after gaining additional experience.'
  }
}

// Example requirements (would come from props in real implementation)
const requirements = ref([
  { description: 'Minimum 5 years experience', met: true },
  { description: 'Bachelor\'s degree in related field', met: true },
  { description: 'Required certification', met: false },
  { description: 'Technical skill requirements', met: true }
])

const openDialog = () => {
  dialogRef.value?.showModal()
}

const closeDialog = () => {
  dialogRef.value?.close()
}

const closeOnBackdropClick = (e) => {
  if (e.target !== dialogRef.value) {
    closeDialog()
  }
}
</script>