import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="relative z-10 text-center px-4 mb-2">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold md:text-6xl text-gray-900 dark:text-gray-100 tracking-tight">
            Tags
          </h1>
        </div>
        <div className="max-w-lg mx-auto">
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Browse through our collection of tags below.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tagKeys.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
            )}
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mb-2">
                  <Tag text={t} />
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {` (${tagCounts[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}