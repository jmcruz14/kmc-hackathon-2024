<template>
  <JobListingsCard
      title="UI/UX Designer"
      :company="{ name: 'Heywork', logo: '/api/placeholder/80/80' }"
      :applications="120"
      postedTime="10 days ago"
      :tags="['High english', 'Remote', 'Senior', 'Full time']"
      :additionalTags="2"
    />
    <JobListingsCard
      title="Senior Software Developer"
      :company="{ name: 'Hardcourt Studios', logo: '/api/placeholder/80/80' }"
      :applications="85"
      postedTime="3 days ago"
      :tags="['React', 'Node.js', 'Senior', 'Hybrid']"
      :additionalTags="3"
    />
    <JobListingsCard
      title="Product Marketing Manager"
      :company="{ name: 'Stellar Tech', logo: '/api/placeholder/80/80' }"
      :applications="45"
      postedTime="Just now"
      :tags="['Marketing', 'B2B', 'Mid-Level', 'On-site']"
      :additionalTags="2"
    />
    <JobListingsCard
      title="Data Scientist"
      :company="{ name: 'Analytics Co', logo: '/api/placeholder/80/80' }"
      :applications="92"
      postedTime="1 week ago"
      :tags="['Python', 'Machine Learning', 'Senior', 'Remote']"
      :additionalTags="4"
    />
    <JobListingsCard
      title="DevOps Engineer"
      :company="{ name: 'CloudScale', logo: '/api/placeholder/80/80' }"
      :applications="67"
      postedTime="5 days ago"
      :tags="['AWS', 'Kubernetes', 'Mid-Level', 'Remote']"
      :additionalTags="3"
    />
</template>

<script>
import JobListingsCard from '../cards/JobListingsCard.vue';

export default {
  components: {
    JobListingsCard
  },
  setup () {
    return {}
  }
}

</script>