import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Arrow from '@/components/Arrow'

//const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Link
                          href={`/board/member/${author.slug}`}
                          target="_blank"
                          className="text-white hover:text-primary-500"
                        >
                          <Image
                            src={author.avatar}
                            width={64}
                            height={64}
                            alt={`${author.name}'s avatar`}
                            className="h-12 w-12 rounded-full"
                          />
                        </Link>
                      )}
                      <dl className="whitespace-nowrap font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd>
                          <Link
                            href={`/board/member/${author.slug}`}
                            target="_blank"
                            className="transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-500"
                          >
                            {author.name}
                          </Link>
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 text-justify dark:prose-invert">
                {children}
              </div>
              {/*
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                  <Link href={discussUrl(path)} rel="nofollow">Discuss on Twitter</Link>
                  {` • `}
                  <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              */}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags?.length > 0 && (
                  <div className="py-4 xl:py-8">
                    <h2 className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <Link href={`/${prev.path}`}>
                        <div className="mb-3 rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                          <h2 className="uppercase tracking-wide mb-2 text-gray-500 dark:text-gray-400">
                            Previous Article
                          </h2>
                          <h3 className="text-base font-semibold mb-2">{prev.title}</h3>
                          <span className="text-primary-500 text-primary-600">
                            <Arrow direction="left">Read More</Arrow>
                          </span>
                        </div>
                      </Link>
                    )}
                    {next && next.path && (
                      <Link href={`/${next.path}`}>
                        <div className="rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                          <h2 className="uppercase tracking-wide mb-2 text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <h3 className="text-base font-semibold mb-2">{next.title}</h3>
                          <span className="text-primary-600 dark:text-primary-500">
                            <Arrow direction="right">Read More</Arrow>
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Link
                  href={`/${basePath}`}
                  className="group flex w-full items-center justify-center space-x-2 rounded-md bg-primary-600 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                  aria-label="Back to the blog"
                >
                  <Arrow direction="left">Back to the blog</Arrow>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
