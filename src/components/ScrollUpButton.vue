<template>
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="fixed bottom-4 right-4 p-3 bg-slate-400 text-white rounded-full shadow-xl hover:bg-red-700 transition-colors"
    aria-label="Scroll to top"
  >
    ↑
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ScrollUpButton',
  setup() {
    const showButton = ref(false)

    const handleScroll = () => {
      showButton.value = window.scrollY > window.innerHeight
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { showButton, scrollToTop }
  }
})
</script>
