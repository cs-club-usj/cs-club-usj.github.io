'use client'

import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const MAX_DISPLAY = 5

const REGISTRATION_LINK =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=NGnZKuVDwkGXYfM1_iFMw3XHbG_Qm39JsdCpCi0bIXpUQkFLM0ZMVDRXMEE2RENPRFlUQlJXWUpRNi4u&origin=Invitation&channel=0'

const images = [
  '/static/images/talk2.jpg',
  '/static/images/mohammad-darsa.jpg',
  '/static/images/talk.jpeg',
  '/static/images/salim-slim.jpeg',
]

export default function Home({ posts }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  )

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col items-center justify-between space-y-20 md:flex-row md:space-y-0">
        <div className="flex flex-col gap-5 md:w-1/2">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-5xl">
            Empowering Tech Leaders of Tomorrow
          </h1>
          <Link
            href={REGISTRATION_LINK}
            className="flex w-fit items-center justify-center rounded-md bg-primary-500 p-4 font-semibold text-white transition-colors hover:bg-primary-400"
          >
            Register Today!
          </Link>
        </div>
        <div
          className="aspect-[4/3] w-full overflow-hidden shadow-[10px_10px_0px_0px_primary-500] shadow-primary-500 md:w-1/2"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1080}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
