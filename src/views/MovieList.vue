<template>
  <div class="relative container mx-auto px-4">
    <h1 class="text-2xl mb-4 text-center font-bold">What to watch</h1>
    <div class="flex justify-center mb-6 gap-4">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="setCategory(cat)"
        :class="[
          'px-2 py-1 rounded-full border-2 border-white hover:border-slate-200',
          { 'bg-slate-200 border-slate-200': category === cat }
        ]"
      >
        #{{ cat.replace('_', ' ') }}
      </button>
    </div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <div
      v-else-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <SkeletonMovieTile v-for="num in 10" :key="'skeleton-' + num" />
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <MovieTile v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import MovieTile from '@/components/MovieTile.vue'
import { Movie } from '@/common/definitions'
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { getMoviesData } from '@/api/axios'
import { useRoute, useRouter } from 'vue-router'
import SkeletonMovieTile from '@/components/SkeletonMovieTile.vue'

export default defineComponent({
  name: 'MovieList',
  components: { MovieTile, SkeletonMovieTile },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const movies = ref<Movie[]>([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const category = ref(route.query.category || 'popular')
    const categories = ['popular', 'top_rated', 'now_playing']

    const fetchMovies = async (selectedCategory: string, page = 1) => {
      if (isLoading.value || (page > 1 && page > totalPages.value)) return
      isLoading.value = true
      error.value = null

      try {
        const moviesData = await getMoviesData(selectedCategory, page)
        if (page === 1) {
          movies.value = moviesData.results
        } else {
          movies.value.push(...moviesData.results)
        }
        currentPage.value = page
        totalPages.value = moviesData.total_pages
      } catch (err) {
        error.value = 'Failed to fetch movies. Please try again later.'
        console.error(`Error fetching movies: ${err}`)
      } finally {
        isLoading.value = false
      }
    }

    const setCategory = (selectedCategory: string) => {
      router.push({ name: 'MovieList', query: { category: selectedCategory } })
    }

    const loadMoreMovies = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchMovies(String(category.value), currentPage.value + 1)
      }
    }

    watch(
      () => route.query.category,
      (newCategory) => {
        const selectedCategory = newCategory || 'popular'
        category.value = selectedCategory
        currentPage.value = 1
        totalPages.value = 1
        fetchMovies(String(selectedCategory))
      },
      { immediate: true }
    )

    onMounted(() => {
      window.addEventListener('scroll', loadMoreMovies)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', loadMoreMovies)
    })

    return { movies, category, setCategory, isLoading, categories, error }
  }
})
</script>
