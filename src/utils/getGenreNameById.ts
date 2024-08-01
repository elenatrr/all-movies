import { Genre } from '@/definitions'

export function getGenreNameById(genres: Genre[], id: number) {
  const genre = genres.find((genre) => genre.id === id)
  return genre ? genre.name : null
}
