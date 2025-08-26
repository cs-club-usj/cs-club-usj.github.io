import { ChevronRight } from "lucide-react"

export default function ArrowRight({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className={"inline-flex items-center gap-1"}>
      <span>{children}</span>
      <ChevronRight className="h-4 w-4 stroke-[3] text-current" />
    </span>
  )
}
