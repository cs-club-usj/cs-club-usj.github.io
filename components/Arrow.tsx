import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Arrow({
  children,
  direction = 'left',
}: {
  children: React.ReactNode
  direction?: 'left' | 'right'
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        direction === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="-ml-1 h-4 w-4 stroke-[3] text-current" />
      ) : (
        <ChevronRight className="-mr-1 h-4 w-4 stroke-[3] text-current" />
      )}
      <span>{children}</span>
    </span>
  )
}
