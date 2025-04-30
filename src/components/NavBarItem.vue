<script setup>
defineProps({
  icon: {
    type: Object,
    default: null,
  },
  imageUrl: {
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
    <div class="flex flex-col items-center w-16">
        <!--div for image/icon/logo-->
        <div class="flex items-center justify-center">
            <component :is="icon" :size="24" v-if="icon"/>
            <img v-else-if="imageUrl" :src="imageUrl" alt="icon" class="size-6px"
        </div>
        <!--div for text under logo-->
        <div class="mt-2 text-sm text-center">
            {{ text }}
        </div>
    </div>
</template>