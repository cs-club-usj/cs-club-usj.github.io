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
    <div className="max-h-screen">
      <div className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto mb-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Tags
            </h1>
            <p className="text-xl text-gray-900 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Click on any tag to explore related posts
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-md border border-gray-200 dark:border-gray-700">
            <svg className="w-5 h-5 text-primary-600 dark:text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="font-medium cursor-default">
              {tagKeys.length} {tagKeys.length === 1 ? 'Tag' : 'Tags'} Available
            </span>
          </div>
        </div>
        {tagKeys.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No tags found</p>
            <p className="text-gray-400 dark:text-gray-500">Tags will appear here once content is published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="relative p-6 rounded-md border border-gray-200 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
                    {isPopular && (
                      <div className="absolute -top-2 -right-2 text-white font-bold px-2 py-1 rounded-md">
                        Popular
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-between mb-4">
                      <div className="flex items-center mr-3 text-sm font-medium uppercase text-primary-600 dark:text-primary-500">
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
                    <div className="mt-4 flex flex-col items-center text-primary-600 dark:text-primary-500 font-medium">
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