<template>
  <header>
    <menu class="flex gap-8 justify-between border-b-2 pb-3 mb-6">
      <RouterLink to="/" class="flex items-center gap-2 text-3xl italic font-bold">
        <img alt="All Movies logo" class="logo" src="@/assets/logo.png" width="40" height="40" />
        <h1 class="text-red-700">All Movies</h1>
      </RouterLink>
      <div>
        <nav class="text-lg flex flex-col sm:flex-row gap-2 sm:gap-8 font-bold">
          <RouterLink to="/" class="hover:bg-slate-200 py-2 px-4 rounded-full transition-all"
            >Home</RouterLink
          >
          <RouterLink to="/about" class="hover:bg-slate-200 py-2 px-4 rounded-full transition-all"
            >About</RouterLink
          >
        </nav>
      </div>
    </menu>
  </header>
  <main>
    <RouterView />
    <ScrollUpButton />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getGenresData } from './api/axios'
import ScrollUpButton from './components/ScrollUpButton.vue'

onMounted(() => {
  getGenresData()
})
</script>
