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
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Gallery
      </h1>
      <Gallery images={imagesWithBlur} />
    </>
  )
}
