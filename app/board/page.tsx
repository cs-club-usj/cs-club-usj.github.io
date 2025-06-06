import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Board' })

export default function Page() {
  const president = allAuthors.find((p) => p.role === 'President') as Authors
  const vp = allAuthors.find((p) => p.role === 'Vice-President') as Authors
  const treasurer = allAuthors.find((p) => p.role === 'Treasurer') as Authors
  const secretary = allAuthors.find((p) => p.role === 'Secretary') as Authors

  const board = allAuthors.filter((p) => p.role === 'Board Member')

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Meet the Board
        </h1>
      </div>
      <div className="flex flex-col items-center gap-y-10">
        <div className="flex flex-row flex-wrap justify-center gap-x-10">
          <AuthorLayout content={coreContent(president)} />
          <AuthorLayout content={coreContent(vp)} />
          <AuthorLayout content={coreContent(secretary)} />
          <AuthorLayout content={coreContent(treasurer)} />
          {board.map((member) => (
            <AuthorLayout key={member._id} content={coreContent(member)} />
          ))}
        </div>
      </div>
    </div>
  )
}
