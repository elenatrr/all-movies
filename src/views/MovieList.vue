<template>
  <div class="container mx-auto px-4">
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <MovieTile v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <p v-if="isLoading" class="text-center mt-4">Loading...</p>
  </div>
</template>

<script lang="ts">
import MovieTile from '@/components/MovieTile.vue'
import { Movie } from '@/common/definitions'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMoviesData } from '@/api/axios'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'MovieList',
  components: { MovieTile },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const movies = ref<Movie[]>([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const isLoading = ref(false)
    const category = ref(route.query.category || 'popular')
    const categories = ['popular', 'top_rated', 'now_playing']

    const setCategory = (selectedCategory: string) => {
      router.push({ name: 'MovieList', query: { category: selectedCategory } })
    }

    const fetchMovies = async (page = 1) => {
      if (isLoading.value || currentPage.value > totalPages.value) {
        return
      }

      isLoading.value = true

      try {
        const moviesData = await getMoviesData(String(category.value), page)
        if (page === 1) {
          movies.value = moviesData.results
        } else {
          movies.value = [...movies.value, ...moviesData.results]
        }
        currentPage.value = page
        totalPages.value = moviesData.total_pages
      } catch (error) {
        console.error(`Error fetching movies: ${error}`)
      } finally {
        isLoading.value = false
      }
    }

    const loadMoreMovies = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchMovies(currentPage.value + 1)
      }
    }

    watch(route, () => {
      category.value = route.query.category || 'popular'
      fetchMovies()
    })

    onMounted(() => {
      fetchMovies()
      window.addEventListener('scroll', loadMoreMovies)
    })

    return { movies, category, setCategory, isLoading, fetchMovies, categories, route }
  }
})
</script>
