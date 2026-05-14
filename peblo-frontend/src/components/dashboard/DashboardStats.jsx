function StatCard({ label, value, icon, color = 'indigo' }) {
  const colors = {
    indigo:  { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  icon: 'text-amber-400'  },
    sky:     { bg: 'bg-sky-500/10',    border: 'border-sky-500/20',    icon: 'text-sky-400'    },
  }
  const c = colors[color] || colors.indigo

  return (
    <div className="bg-[#1a1a1a] border border-[#242424] rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center ${c.icon}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-100 tracking-tight">{value ?? '—'}</p>
    </div>
  )
}

export default function DashboardStats({ data }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Notes"
        value={data?.totalNotes}
        color="indigo"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />
      <StatCard
        label="AI Requests"
        value={data?.aiUsageCount}
        color="emerald"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
      <StatCard
        label="This Week"
        value={data?.weeklyActivity}
        color="amber"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
      <StatCard
        label="Top Tags"
        value={data?.mostUsedTags?.length ?? 0}
        color="sky"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
      />
    </div>
  )
}
