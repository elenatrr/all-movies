<!-- This page contains detailed information about the selected movie -->
<template>
  <div v-if="error" class="text-center text-red-500">{{ error }}</div>
  <SkeletonMovieDetails v-else-if="isLoading" />
  <div v-else-if="movieDetails" class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-2">{{ movieDetails.original_title }}</h1>
    <div class="flex mt-4 flex-col gap-8 sm:flex-row mb-4">
      <div class="sm:w-1/3">
        <img
          class="w-full mb-4 rounded-lg shadow-lg"
          :src="`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`"
          :alt="movieDetails.original_title"
        />
      </div>
      <ul class="flex md:gap-1 flex-col">
        <li>
          Rating:
          <span class="font-bold text-lg">{{ movieDetails.vote_average.toFixed(1) }}</span> ({{
            formattedVoteCount
          }})
        </li>
        <li>Runtime: {{ movieDetails.runtime }} mins</li>
        <li>Budget: ${{ formattedBudget }}</li>
        <li>Revenue: ${{ formattedRevenue }}</li>
        <li>Release date: {{ formattedReleaseDate }}</li>
        <li>Countries: {{ formattedCountries }}</li>
        <li v-if="movieDetails.tagline">Tagline: '{{ movieDetails.tagline }}'</li>
        <li>
          Genres: <span class="font-bold">{{ formattedGenres }}</span>
        </li>
      </ul>
    </div>
    <p>{{ movieDetails.overview }}</p>
    <div class="mt-4">
      <h2 class="text-2xl font-bold mb-4">Recommendations</h2>
      <div
        v-if="isLoading"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <SkeletonMovieTile v-for="num in 10" :key="'skeleton-' + num" />
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <MovieTile
          v-for="recommendedMovie in recommendedMovies"
          :key="recommendedMovie.id"
          :movie="recommendedMovie"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import MovieTile from '@/components/MovieTile.vue'
import { getMovieDetailsData, getRecommendedMoviesData } from '@/api/axios'
import { formatReleaseDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'
import { Movie, MovieDetails } from '@/common/definitions'
import SkeletonMovieTile from '@/components/SkeletonMovieTile.vue'
import SkeletonMovieDetails from '@/components/SkeletonMovieDetails.vue'

export default defineComponent({
  name: 'MovieDetails',
  components: { MovieTile, SkeletonMovieTile, SkeletonMovieDetails },
  setup() {
    const movieDetails = ref<MovieDetails | null>(null)
    const recommendedMovies = ref<Movie[]>([])
    const route = useRoute()
    const maxRecommendedMoviesAmount = 12
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    const formattedVoteCount = computed(() =>
      movieDetails.value ? formatNumber(movieDetails.value.vote_count) : ''
    )
    const formattedBudget = computed(() =>
      movieDetails.value ? formatNumber(movieDetails.value.budget) : ''
    )
    const formattedRevenue = computed(() =>
      movieDetails.value ? formatNumber(movieDetails.value.revenue) : ''
    )
    const formattedReleaseDate = computed(() =>
      movieDetails.value ? formatReleaseDate(movieDetails.value.release_date) : ''
    )
    const formattedCountries = computed(() =>
      movieDetails.value
        ? movieDetails.value.production_countries.map((country) => country.name).join(', ')
        : ''
    )
    const formattedGenres = computed(() =>
      movieDetails.value ? movieDetails.value.genres.map((genre) => genre.name).join(', ') : ''
    )

    const fetchMovieDetails = async () => {
      error.value = null
      isLoading.value = true

      try {
        const movieId = String(route.params.id)
        const [movieDetailsResponse, recommendedMoviesResponse] = await Promise.all([
          getMovieDetailsData(movieId),
          getRecommendedMoviesData(movieId)
        ])

        movieDetails.value = movieDetailsResponse
        recommendedMovies.value = recommendedMoviesResponse.results.slice(
          0,
          maxRecommendedMoviesAmount
        )
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (err) {
        error.value = 'Failed to fetch movie details. Please try again later.'
        console.error(`Error fetching movie details: ${err}`)
      } finally {
        isLoading.value = false
      }
    }

    // Fetch movie details on initial render and each time the route changes
    watch(() => route.params.id, fetchMovieDetails, { immediate: true })

    return {
      movieDetails,
      recommendedMovies,
      formattedVoteCount,
      formattedBudget,
      formattedRevenue,
      formattedReleaseDate,
      formattedCountries,
      formattedGenres,
      error,
      isLoading
    }
  }
})
</script>
