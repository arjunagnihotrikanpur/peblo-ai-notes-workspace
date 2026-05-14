const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
}

export default function LoadingSpinner({ size = 'md', className = '' }) {
  return (
    <div
      className={`
        ${SIZES[size]}
        rounded-full
        border-indigo-500/30
        border-t-indigo-500
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  )
}
