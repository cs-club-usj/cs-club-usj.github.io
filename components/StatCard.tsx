"use client";

import CountUp from "react-countup";

interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md px-8 py-4 text-center flex flex-col items-center justify-center">
      <span className="text-2xl font-bold">
        <CountUp start={0} end={parseInt(value)} duration={3.5} />+
      </span>
      <p className="text-xl mt-2">{label}</p>
    </div>
  );
}