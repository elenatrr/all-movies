<!-- This component is displayed when the movie information in the tile is still loading -->
<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto animate-pulse w-full">
    <div class="relative h-80 bg-gray-300">
      <div class="absolute top-2 right-2 bg-gray-200 h-8 w-16 rounded-lg"></div>
      <div class="w-full h-full object-cover bg-gray-200"></div>
      <div class="text-xs absolute bottom-0 px-2 py-1 rounded-tr-lg bg-gray-200 h-8 w-full"></div>
    </div>
    <div class="px-3 py-2">
      <div class="h-6 bg-gray-200 mb-2 rounded"></div>
      <div class="h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonMovieTile'
})
</script>
