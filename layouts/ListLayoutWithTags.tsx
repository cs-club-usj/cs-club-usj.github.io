'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import Arrow from '@/components/Arrow'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  console.log(pathname)
  console.log(basePath)
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button
            className="group flex cursor-not-allowed items-center justify-center space-x-2 rounded-md bg-primary-600 px-3 py-2 font-semibold text-white disabled:opacity-50"
            disabled={!prevPage}
          >
            <Arrow direction="left">Previous</Arrow>
          </button>
        )}
        {prevPage && (
          <Link
            className="group flex items-center justify-center space-x-2 rounded-md bg-primary-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-primary-700"
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            <Arrow direction="left">Previous</Arrow>
          </Link>
        )}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1
            const isActive = page === currentPage

            return (
              <Link
                key={page}
                href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
                className={`flex items-center justify-center rounded-md px-3 py-1 font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-600 text-white opacity-50 transition-opacity hover:opacity-100'
                }`}
              >
                {page}
              </Link>
            )
          })}
        </div>
        {!nextPage && (
          <button
            className="group flex cursor-not-allowed items-center justify-center space-x-2 rounded-md bg-primary-600 px-3 py-2 font-semibold text-white disabled:opacity-50"
            disabled={!nextPage}
          >
            <Arrow direction="right">Next</Arrow>
          </button>
        )}
        {nextPage && (
          <Link
            className="group flex items-center justify-center space-x-2 rounded-md bg-primary-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-primary-700"
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
          >
            <Arrow direction="right">Next</Arrow>
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded-md border border-gray-200 dark:border-gray-700 sm:flex">
            <div className="px-6 py-4">
              <div className="space-y-3">
                {pathname.startsWith('/blog') ? (
                  <h3 className="font-bold uppercase text-primary-600">All Posts</h3>
                ) : (
                  <Link
                    href={`/blog`}
                    className="font-bold uppercase text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                  >
                    All Posts
                  </Link>
                )}
                <h3 className="cursor-default font-bold uppercase text-gray-700 dark:text-gray-300">
                  Browse by Tags:
                </h3>
              </div>
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="inline cursor-default px-3 py-2 text-sm font-bold uppercase text-primary-600">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="mb-2 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${path}`}
                              className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-600"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-justify text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
