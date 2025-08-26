import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allEvents } from 'contentlayer/generated'
import Card from '@/components/Card'
import Carousel from '@/components/Carousel'
import ArrowRight from '@/components/arrows/ArrowRight'

const MAX_BLOG_DISPLAY = 5
const MAX_EVENTS_DISPLAY = 5

const REGISTRATION_LINK =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=NGnZKuVDwkGXYfM1_iFMw3XHbG_Qm39JsdCpCi0bIXpUQkFLM0ZMVDRXMEE2RENPRFlUQlJXWUpRNi4u&origin=Invitation&channel=0'

export default function Home({ posts, images }) {
  const events = allCoreContent(sortPosts(allEvents, 'date'))

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col items-center justify-between space-y-20 md:flex-row md:space-y-0">
        <div className="flex flex-col gap-5 md:w-1/2">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-5xl">
            Empowering Tech Leaders of Tomorrow
          </h1>
          <Link
            href={REGISTRATION_LINK}
            className="flex w-fit items-center justify-center rounded-md bg-primary-600 p-4 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Register Today!
          </Link>
        </div>
        <Carousel images={images} />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Events
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.descriptionEvents}
          </p>
        <ul>
            {!events.length && 'No events found.'}
            {events.slice(0, MAX_EVENTS_DISPLAY).map((event) => (
              <Card event={event} key={event.slug} isLandscape />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="space-y-2 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.descriptionLatest}
          </p>
          <hr className="border-gray-200 dark:border-gray-700" />
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_BLOG_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="pt-6 pb-10">
                <article className="flex flex-col h-full">
                  <div className="space-y-3 mb-5">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="transition-colors text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-500"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap mt-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex items-center mb-6">
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400 text-justify w-full">
                      {summary}
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/blog/${slug}`}
                      className="px-3 py-2 group w-full items-center justify-center space-x-2 rounded-md bg-primary-600 font-semibold text-white transition-colors hover:bg-primary-700"
                      aria-label={`Read more: "${title}"`}
                    >
                      <ArrowRight>Read more</ArrowRight>
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>
      {posts.length > MAX_BLOG_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="px-4 py-2 group flex items-center justify-center space-x-2 rounded-md bg-primary-600 font-semibold text-white transition-colors hover:bg-primary-700"
            aria-label="All posts"
          >
            <ArrowRight>All Posts</ArrowRight>
          </Link>
        </div>
      )}
    </div>
  )
}
