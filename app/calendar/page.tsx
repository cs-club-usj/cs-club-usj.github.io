import Calendar from '@/components/Calendar'
import { genPageMetadata } from 'app/seo'
import { allEvents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'Calendar' })

export default function CalendarPage() {
  const events = allCoreContent(sortPosts(allEvents, 'date')).map((event) => ({
    slug: event.slug,
    title: event.title,
    date: event.date,
    location: event.location,
    speaker: event.speaker,
    upcoming: event.upcoming,
    more: event.more,
  }))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Events Calendar
        </h1>
      </div>
      <div className="py-12">
        <Calendar events={events} />
      </div>
    </div>
  )
}
