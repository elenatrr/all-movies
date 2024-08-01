<template>
  <div
    v-if="movie"
    class="max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform mx-auto"
    @click="goToDetails"
  >
    <div class="relative h-80">
      <p class="absolute top-2 right-2 bg-white opacity-90 p-1 rounded-lg min-w-8 text-center">
        {{ movie.vote_average.toFixed(1) }}
      </p>
      <img
        class="w-full h-full object-cover object-bottom shadow-md"
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        :alt="movie.original_title"
      />
      <div
        v-if="movieGenres"
        class="text-xs absolute bottom-0 px-2 rounded-tr-lg bg-white opacity-90"
      >
        {{ movieGenres.join(', ') }}
      </div>
    </div>
    <div class="px-3 py-2">
      <h4 class="font-bold text-lg mb-1">{{ movie.title }}</h4>
      <p class="text-sm text-gray-700">{{ movie.overview.substring(0, 70) }}...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { getGenreNameById } from '@/api/axios'
import { defineComponent, onMounted, ref } from 'vue'
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

    const getGenresList = () => {
      const maxGenresAmount = 3
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

    return { goToDetails, movieGenres }
  }
})
</script>
