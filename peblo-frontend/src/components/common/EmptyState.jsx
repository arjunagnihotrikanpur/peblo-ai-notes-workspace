export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-600 mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-300 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 max-w-xs mb-6">{description}</p>
      )}
      {action && action}
    </div>
  )
}
