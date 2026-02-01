'use client'

import Link from '@/components/Link'
import { CalendarDays, LayoutGrid } from 'lucide-react'

interface ViewToggleProps {
  activeView: 'grid' | 'calendar'
}

export default function ViewToggle({ activeView }: ViewToggleProps) {
  return (
    <div className="inline-flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
      <Link
        href="/events"
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeView === 'grid'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Grid
      </Link>
      <Link
        href="/calendar"
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeView === 'calendar'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
      >
        <CalendarDays className="h-4 w-4" />
        Calendar
      </Link>
    </div>
  )
}
