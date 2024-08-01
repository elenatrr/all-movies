import { Genre } from '@/common/definitions'
import axios from 'axios'
import { ref } from 'vue'

const theMovieDbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    Accept: 'application/json'
  }
})

const genres = ref<Genre[]>([])

const getMoviesData = async (category: string, page = 1) => {
  try {
    const response = await theMovieDbApi.get(`/movie/${category}?page=${page}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching movies: ${error}`)
  }
}

const getMovieDetailsData = async (id: string) => {
  try {
    const response = await theMovieDbApi.get(`/movie/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching movie details: ${error}`)
  }
}

const getRecommendedMoviesData = async (id: string) => {
  try {
    const response = await theMovieDbApi.get(`/movie/${id}/recommendations`)
    return response.data
  } catch (error) {
    console.error(`Error fetching recommended movies: ${error}`)
  }
}

const getGenresData = async () => {
  try {
    const response = await theMovieDbApi.get(`/genre/movie/list`)
    genres.value = response.data.genres
    return response.data
  } catch (error) {
    console.error(`Error fetching genres: ${error}`)
  }
}

export function getGenreNameById(id: number): string | null {
  const genre = genres.value.find((genre) => genre.id === id)
  return genre ? genre.name : null
}

export { getMoviesData, getMovieDetailsData, getRecommendedMoviesData, getGenresData }
