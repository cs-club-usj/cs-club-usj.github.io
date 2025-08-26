import 'css/prism.css'
import 'katex/dist/katex.css'

import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allEvents } from 'contentlayer/generated'
import type { Event } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Gallery } from '@/components/Gallery'
import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import Link from '@/components/Link'
import Arrow from '@/components/Arrow'

// TODO: Generate metadata
// export async function generateMetadata(props: {
//   params: Promise<{ slug: string[] }>
// }): Promise<Metadata | undefined> {
// }

export const generateStaticParams = async () => {
  return allEvents.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const sortedCoreContents = allCoreContent(sortPosts(allEvents))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const event = allEvents.find((p) => p.slug === slug) as Event

  const prev = postIndex > 0 ? sortedCoreContents[postIndex - 1] : null
  const next = postIndex + 1 < sortedCoreContents.length ? sortedCoreContents[postIndex + 1] : null

  const imagesWithBlur = await Promise.all(
    event.images.map(async (src) => {
      const filePath = path.join(process.cwd(), 'public', src)
      const buffer = fs.readFileSync(filePath)
      const { base64 } = await getPlaiceholder(buffer)

      return { src, blurDataURL: base64 }
    })
  )

  return (
    <>
      <div className="relative">
        <div className="relative text-center">
          <div className="divide-y divide-gray-700 dark:divide-gray-700">
            <h1 className="mt-4 mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-7xl">
              Gallery
            </h1>
          </div>
          <div className="space-y-4">
            <h2 className="mx-auto max-w-4xl text-2xl font-semibold leading-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl lg:text-5xl">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {event.date && (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date.split("T")[0].split("-").reverse().join("-")}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              )}
              {imagesWithBlur.length > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {imagesWithBlur.length} photos
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="relative">
          <Gallery images={imagesWithBlur} />
          <footer className="mt-4">
            {(prev || next) && (
              <div className="flex justify-between gap-4">
                {prev && (
                  <Link href={`/events/${prev.slug}`}>
                    <div className="p-4 rounded-md border border-gray-200 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
                      <h2 className="uppercase tracking-wide text-gray-500 dark:text-gray-400">Previous Gallery</h2>
                      <h3 className="text-base font-semibold">{prev.title}</h3>
                      <span className="text-primary-600 dark:text-primary-500">
                        <Arrow direction="left">View gallery</Arrow>
                      </span>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link href={`/events/${next.slug}`}>
                    <div className="p-4 rounded-md border border-gray-200 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
                      <h2 className="uppercase tracking-wide text-gray-500 dark:text-gray-400">Next Gallery</h2>
                      <h3 className="text-base font-semibold">{next.title}</h3>
                      <span className="text-primary-600 dark:text-primary-500">
                        <Arrow direction="right">View gallery</Arrow>
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  )
}
