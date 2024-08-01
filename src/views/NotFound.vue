<template>
  <div class="font-sans flex flex-col items-center justify-center p-4">
      <h2 class="text-center mb-2">404 Not Found</h2>
      <p class='mb-4'>Could not find the requested data.</p>
      <RouterLink
        to="/"
        class="text-center rounded-md bg-slate-700 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-500 min-w-32"
      >
        Home Page
      </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
