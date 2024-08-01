<template>
  <div v-if="movieDetails" class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-2">{{ movieDetails.original_title }}</h1>
    <div class="mt-4 flex gap-8">
      <div class="w-1/3">
        <img
          class="w-full mb-4 rounded-lg shadow-lg"
          :src="`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`"
          :alt="movieDetails.original_title"
        />
      </div>
      <ul class="w-2/3">
        <li>
          Rating:
          <span class="font-bold text-lg">{{ movieDetails.vote_average.toFixed(1) }}</span> ({{
            formattedVoteCount
          }})
        </li>
      </ul>
    </div>
    <p class="text-lg">{{ movieDetails.overview }}</p>
    <div class="mt-4">
      <h2 class="text-2xl font-bold mb-4">Recommendations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
import { getMovieDetailsData, getRecommendedMoviesData } from '@/api/axios'
import { Movie, MovieDetails } from '@/common/definitions'
import MovieTile from '@/components/MovieTile.vue'
import { formatNumber } from '@/utils/formatNumber'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MovieDetails',
  components: { MovieTile },

  setup() {
    const movieDetails = ref<MovieDetails | null>(null)
    const recommendedMovies = ref<Movie[]>([])
    const route = useRoute()
    const formattedVoteCount = ref('')
    const maxRecommendedMoviesAmount = 12

    onMounted(async () => {
      try {
        const movieDetailesResponse = await getMovieDetailsData(String(route.params.id))
        const recommendedMoviesResponse = await getRecommendedMoviesData(String(route.params.id))

        movieDetails.value = movieDetailesResponse
        recommendedMovies.value = recommendedMoviesResponse.results.slice(
          0,
          maxRecommendedMoviesAmount
        )
        formattedVoteCount.value = formatNumber(movieDetailesResponse.vote_count)
      } catch (error) {
        console.error(`Error fetching movie detailes: ${error}`)
      }
    })

    return { movieDetails, recommendedMovies, formattedVoteCount }
  }
})
</script>
