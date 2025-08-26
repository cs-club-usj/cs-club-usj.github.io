import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Arrow({
  children,
  direction = "left"
}: {
  children: React.ReactNode
  direction?: "left" | "right"
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        direction === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {direction === "left" ? (
        <ChevronLeft className="h-4 w-4 stroke-[3] text-current -ml-1" />
      ) : (
        <ChevronRight className="h-4 w-4 stroke-[3] text-current -mr-1" />
      )}
      <span>{children}</span>
    </span>
  )
}
