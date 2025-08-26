import { ChevronLeft } from "lucide-react"

export default function ArrowLeft({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className={"inline-flex items-center gap-1"}>
      <ChevronLeft className="h-4 w-4 stroke-[3] text-current" />
      <span>{children}</span>
    </span>
  )
}
