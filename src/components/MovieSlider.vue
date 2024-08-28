<!-- This components displays passed movie information in a format of tile -->
<template>
  <div
    v-if="movie"
    class="max-w-xl rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform mx-auto"
    @click="goToDetails"
  >
    <div class="relative flex align-middle ">
      <div class="imagebox">
        
        <img
          class="w-full h-full object-cover object-center shadow-md"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.original_title"
        />
        
      </div>
      <div class="contentbox px-3 py-2 flex">
        <div class="content-wrapper">
          <h4 class="font-bold text-lg mb-1">{{ movie.title }}</h4>
          <p class="text-sm text-gray-700">{{ movie.overview }}</p>
          <div class="MovieRates"><span>Ratings {{ formattedVoteAverage }}</span></div>
          <div 
          v-if="movieGenres"
          class="movieGenres text-xs  bottom-0 px-2 rounded-tr-lg bg-white opacity-90"
        >
          {{ movieGenres.join(', ') }}
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getGenreNameById } from '@/api/axios'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MovieTile',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const movieGenres = ref<string[]>([])
    const maxGenresAmount = 3

    const formattedVoteAverage = computed(() => props.movie.vote_average.toFixed(1))

    const getGenresList = () => {
      const genreNames = props.movie.genre_ids
        .map((genreId: number) => getGenreNameById(genreId))
        .filter((genreName: string | null) => genreName !== null)

      movieGenres.value = genreNames.slice(0, maxGenresAmount)
    }

    const goToDetails = () => {
      router.push({ name: 'MovieDetails', params: { id: props.movie.id } })
    }

    onMounted(() => {
      getGenresList()
    })

    return { goToDetails, movieGenres, formattedVoteAverage }
  }
})
</script>
