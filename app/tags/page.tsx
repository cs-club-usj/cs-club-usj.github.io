import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import Arrow from '@/components/Arrow'

export const metadata = genPageMetadata({ title: 'Tags' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative overflow-hidden">
        <div className="relative mx-auto mb-10 max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold lg:text-6xl">Tags</h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-900 dark:text-gray-100">
              Click on any tag to explore related posts
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center rounded-md border border-gray-200 px-6 py-3 dark:border-gray-700">
            <svg
              className="mr-2 h-5 w-5 text-primary-600 dark:text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="cursor-default font-medium">
              {tagKeys.length} {tagKeys.length === 1 ? 'Tag' : 'Tags'} Available
            </span>
          </div>
        </div>

        {tagKeys.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <svg
                className="h-8 w-8 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <p className="mb-2 text-xl text-gray-500 dark:text-gray-400">No tags found</p>
            <p className="text-gray-400 dark:text-gray-500">
              Tags will appear here once content is published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedTags.map((tag) => {
              const count = tagCounts[tag]
              const isPopular = count >= Math.max(5, Math.max(...Object.values(tagCounts)) * 0.5)
              return (
                <Link
                  key={tag}
                  href={`/tags/${slug(tag)}`}
                  className="group block"
                  aria-label={`View ${count} posts tagged ${tag}`}
                >
                  <div className="relative rounded-md border border-gray-200 p-6 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    {isPopular && (
                      <div className="absolute -right-2 -top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1 text-sm font-bold text-white">
                        Popular
                      </div>
                    )}
                    <div className="mb-4 flex flex-col items-center justify-between">
                      <div className="mr-3 flex items-center text-sm font-medium uppercase text-primary-600 dark:text-primary-500">
                        {tag}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count === 1 ? 'post' : 'posts'}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col items-center font-medium text-primary-600 dark:text-primary-500">
                      <Arrow direction="right">Explore posts</Arrow>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
