import { formatDistanceToNow, format } from 'date-fns'

/**
 * Format a date as relative time (e.g. "2 hours ago")
 */
export const timeAgo = (date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Format a date as readable string
 */
export const formatDate = (date, fmt = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), fmt)
}

/**
 * Truncate text to a given length with ellipsis
 */
export const truncate = (text, length = 120) => {
  if (!text) return ''
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text
}

/**
 * Extract initials from a name
 */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

/**
 * Copy text to clipboard and return success boolean
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Build a public share URL from a shareId
 */
export const buildShareUrl = (shareId) =>
  `${window.location.origin}/shared/${shareId}`

/**
 * Debounce a function
 */
export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
