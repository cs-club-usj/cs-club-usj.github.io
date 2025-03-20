import 'css/prism.css'
import 'katex/dist/katex.css'

import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allEvents } from 'contentlayer/generated'
import type { Event } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Gallery } from '@/components/Gallery'

// TODO: Generate metadata
// export async function generateMetadata(props: {
//   params: Promise<{ slug: string[] }>
// }): Promise<Metadata | undefined> {
// }

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
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

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Gallery
      </h1>
      <Gallery images={event.images} />
    </>
  )
}
