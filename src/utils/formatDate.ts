// This util function edits the date to "10 July 2024" format
import { format } from 'date-fns'

export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'dd MMMM yyyy')
}
