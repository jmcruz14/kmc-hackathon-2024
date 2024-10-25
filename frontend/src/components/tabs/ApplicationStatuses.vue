<template>
  <div class="space-y-4">
    <ApplicationStatusCard
      title="UI/UX Designer"
      :company="{ name: 'Heywork', logo: '/api/placeholder/80/80' }"
      status="approved"
      appliedDate="2 days ago"
      lastUpdated="4 hours ago"
      :tags="['High english', 'Remote', 'Senior', 'Full time']"
      :additionalTags="2"
    />
    
    <ApplicationStatusCard
      title="Senior Software Developer"
      :company="{ name: 'Hardcourt Studios', logo: '/api/placeholder/80/80' }"
      status="pending"
      appliedDate="1 week ago"
      lastUpdated="2 days ago"
      :tags="['React', 'Node.js', 'Senior', 'Hybrid']"
      :additionalTags="3"
    />
    
    <ApplicationStatusCard
      title="Product Marketing Manager"
      :company="{ name: 'Stellar Tech', logo: '/api/placeholder/80/80' }"
      status="rejected"
      appliedDate="2 weeks ago"
      lastUpdated="1 day ago"
      :tags="['Marketing', 'B2B', 'Mid-Level', 'On-site']"
      :additionalTags="2"
    />
  </div>
</template>

<script>
import ApplicationStatusCard from '../cards/ApplicationStatusCard.vue';

export default {
  components: {
    ApplicationStatusCard
  },
  setup () {
    return {}
  }
}

</script>