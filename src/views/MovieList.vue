<!-- This page contains the list of movies that can be filtered by category -->
<template>
  <div class="relative container mx-auto px-4">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
    <swiper-slide v-for="movie in movies" >
      <!-- <div class="slide-content">
        <div></div>
        <h3>{{ movie.original_title }}</h3>
        <p>{{ movie.overview.substring(0, 70) }}...</p>
      </div> -->
      <MovieSlider :key="movie.id" :movie="movie"  />
    </swiper-slide>

    <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <!-- <div class="swiper-wrapper">
        <MovieSlider v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div> -->
    </swiper>

    
    <div class="flex justify-center mb-6 gap-4 mt-20">
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
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
    >
      <SkeletonMovieTile v-for="num in 10" :key="'skeleton-' + num" />
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
    >
      <MovieTile v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import MovieTile from '@/components/MovieTile.vue'
import MovieSlider from '@/components/MovieSlider.vue'
import { Movie } from '@/common/definitions'
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { getMoviesData } from '@/api/axios'
import { useRoute, useRouter } from 'vue-router'
import SkeletonMovieTile from '@/components/SkeletonMovieTile.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'

export default defineComponent({
  name: 'MovieList',
  components: { MovieTile, SkeletonMovieTile, MovieSlider, Swiper, SwiperSlide },

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
    

    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }

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

    // Fetch the list of movies on initial render and each time the category changes
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

    // Unsubscribe from event to handle side-effects
    onUnmounted(() => {
      window.removeEventListener('scroll', loadMoreMovies)
    })

    return { movies, category, setCategory, isLoading, categories, error, onSwiper, onSlideChange }
  }
})
</script>
