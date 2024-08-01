import axios from 'axios'

const theMovieDbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_THE_MOVIE_DB_API_KEY}`,
    Accept: 'application/json'
  }
})

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
    console.error(`Error fetching movie detailes: ${error}`)
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
    return response.data
  } catch (error) {
    console.error(`Error fetching genres: ${error}`)
  }
}

export { getMoviesData, getMovieDetailsData, getRecommendedMoviesData, getGenresData }
