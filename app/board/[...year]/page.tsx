import { Authors, Boards, allAuthors, allBoards } from 'contentlayer/generated'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(props: {
  params: Promise<{ year: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const year = decodeURI(params.year)
  const board = allBoards.find((b) => b.year === year) as Boards

  return {
    title: `Board ${board.year}`,
  }
}

export const generateStaticParams = async () => {
  return allBoards.map((b) => ({ year: [b.year] }))
}

function resolveBoardMembers(board: Boards) {
  return board.members
    .map((m) => {
      const author = allAuthors.find(
        (p) => p.slug === m.name || p._raw.flattenedPath === `authors/${m.name}`
      )
      return {
        ...author,
        role: m.role,
      }
    })
    .filter(Boolean) as (Authors & { role: string })[]
}

export default async function Page(props: { params: Promise<{ year: string }> }) {
  const { year } = await props.params
  const board = allBoards.find((p) => {
    return p.year === year[0]
  }) as Boards
  const members = resolveBoardMembers(board)

  const president = members.find((p) => p.role === 'President') as Authors
  const vp = members.find((p) => p.role === 'Vice-President') as Authors
  const treasurer = members.find((p) => p.role === 'Treasurer') as Authors
  const secretary = members.find((p) => p.role === 'Secretary') as Authors

  const rest = members.filter((p) => p.role === 'Board Member')

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-row flex-wrap gap-10">
          <Link
            href={'/board/2024-2025'}
            className={`transition-all hover:text-primary-600 hover:underline ${board.year === '2024-2025' ? 'text-primary-600' : ''}`}
          >
            <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight">2024-2025</h3>
          </Link>
          <Link
            href={'/board/2025-2026'}
            className={`transition-all hover:text-primary-600 hover:underline ${board.year === '2025-2026' ? 'text-primary-600' : ''}`}
          >
            <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight">2025-2026</h3>
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex flex-row flex-wrap justify-center gap-x-10">
            <AuthorLayout content={coreContent(president)} />
            <AuthorLayout content={coreContent(vp)} />
            <AuthorLayout content={coreContent(secretary)} />
            <AuthorLayout content={coreContent(treasurer)} />
            {rest.map((member) => (
              <AuthorLayout key={member._id} content={coreContent(member)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
