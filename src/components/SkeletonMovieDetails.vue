<template>
  <div class="container mx-auto px-4 animate-pulse">
    <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div class="flex mt-4 flex-col gap-8 sm:flex-row mb-4">
      <div class="sm:w-1/3 bg-gray-300 h-80 rounded-lg mb-4"></div>
      <ul class="flex md:gap-1 flex-col w-full">
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded mb-2"></li>
        <li class="h-6 bg-gray-300 rounded"></li>
      </ul>
    </div>
    <div class="h-6 bg-gray-300 rounded mb-4 w-full"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonMovieDetails'
})
</script>
