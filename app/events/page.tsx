import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { allEvents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'Events' })

export default function Events() {
  const events = allCoreContent(sortPosts(allEvents, 'date'))

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Events
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Discover upcoming and past events organized by the Club!
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <Card key={e.title} event={e} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
