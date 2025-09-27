import { Authors, Boards, allAuthors, allBoards } from 'contentlayer/generated'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import Link from 'next/link'

export const metadata = genPageMetadata({ title: 'Board' })

const CURRENT_YEAR = '2025-2026'

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

export default async function Page() {
  const board = allBoards.find((p) => {
    return p.year === CURRENT_YEAR
  }) as Boards
  const members = resolveBoardMembers(board)

  const president = members.find((p) => p.role === 'President')
  const vp = members.find((p) => p.role === 'Vice-President')
  const treasurer = members.find((p) => p.role === 'Treasurer')
  const secretary = members.find((p) => p.role === 'Secretary')

  const rest = members.filter((p) => p.role === 'Board Member')

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-row flex-wrap gap-10">
          {allBoards.map((b) => (
            <Link
              key={b.year}
              href={`/board/${b.year}`}
              className={`transition-colors hover:text-primary-600 ${
                board.year === b.year ? 'text-primary-600' : ''
              }`}
            >
              <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight">{b.year}</h3>
            </Link>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex flex-row flex-wrap justify-center gap-x-10">
            {president && (
              <AuthorLayout content={coreContent(president as Authors)} role={president.role} />
            )}
            {vp && <AuthorLayout content={coreContent(vp as Authors)} role={vp.role} />}
            {secretary && (
              <AuthorLayout content={coreContent(secretary as Authors)} role={secretary.role} />
            )}
            {treasurer && (
              <AuthorLayout content={coreContent(treasurer as Authors)} role={treasurer.role} />
            )}
            {rest.map((member) => (
              <AuthorLayout key={member._id} content={coreContent(member)} role={member!.role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
