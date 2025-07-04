import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

export default async function Page() {
  const images = [
    '/static/images/events/csrp25/IMG_0047.JPG',
    '/static/images/events/ai-talk-monty/IMG_8652.JPG',
    '/static/images/events/ai-talk-monty/IMG_8635.JPG',
    '/static/images/events/ai-talk-monty/IMG_8648.JPG',
    '/static/images/events/day-in-the-life-murex/IMG_8634.jpg',
    '/static/images/events/day-in-the-life-murex/IMG_8622.jpg',
    '/static/images/events/day-in-the-life-murex/IMG_8629.jpg',
    '/static/images/talk2.jpg',
    '/static/images/mohammad-darsa.jpg',
    '/static/images/talk.jpeg',
    '/static/images/salim-slim.jpeg',
  ]

  const imagesWithBlur = await Promise.all(
    images.map(async (src) => {
      const filePath = path.join(process.cwd(), 'public', src)
      const buffer = fs.readFileSync(filePath)
      const { base64 } = await getPlaiceholder(buffer)

      return { src, blurDataURL: base64 }
    })
  )

  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main images={imagesWithBlur} posts={posts} />
}
