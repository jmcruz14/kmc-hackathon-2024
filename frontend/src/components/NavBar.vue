<template>
  <div 
    class="w-full bg-base-100 border-white-200 shadow-sm"
    :class="borderClass"
  >
    <div class="p-2 m-2 flex justify-around gap-2">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const borderClass = computed(() => {
      if (props.location === 'top') {
        return 'border-b-[0.5px]';
      } 
      return 'border-t-[0.5px]';
    });
    return {
      borderClass
    }
  }
}

</script>