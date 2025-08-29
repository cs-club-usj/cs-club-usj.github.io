'use client'

import CountUp from 'react-countup'

interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 px-8 py-4 text-center dark:bg-gray-800">
      <span className="text-2xl font-bold">
        <CountUp start={0} end={parseInt(value)} duration={3.5} />+
      </span>
      <p className="mt-2 text-xl">{label}</p>
    </div>
  )
}
