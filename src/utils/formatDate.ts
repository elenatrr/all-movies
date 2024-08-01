import { format } from 'date-fns'

export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'dd MMMM yyyy')
}
