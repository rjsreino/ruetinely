<script setup>
defineProps({
  icon: {
    type: Object,
    default: null,
  },
  primeIcon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: 'Home',
  },
})
</script>
<template>
  <div class="flex flex-col items-center w-12">
    <!--div for image/icon/logo-->
    <div class="flex items-center justify-center">
      <component :is="icon" :size="36" v-if="icon" />
      <i v-else-if="primeIcon" :class="`pi pi-${primeIcon}`" style="font-size: 1.6rem"></i>
    </div>
    <!--div for text under logo-->
    <div class="mt-1 text-md text-center">
      {{ text }}
    </div>
  </div>
</template>
