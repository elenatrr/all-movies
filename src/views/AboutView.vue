<!-- This page serves information for user about the application -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">About This App</h1>
    <p class="text-lg">
      Welcome to the Movies App! This app allows you to browse popular movies and view detailed
      information about each movie. You can explore movie posters, overviews, and related videos.
    </p>
    <p class="text-lg mt-4">
      The data for this app is sourced from
      <a href="https://www.themoviedb.org" target="_blank" class="text-blue-500 underline"
        >The Movie Database (TMDb)</a
      >. I hope you enjoy discovering new movies with our app!
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView'
})
</script>
