import Calendar from '@/components/Calendar'
import { genPageMetadata } from 'app/seo'
import { allEvents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ViewToggle from '@/components/ViewToggle'

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
    <>
      <div className="flex justify-end pb-4 pt-6">
        <ViewToggle activeView="calendar" />
      </div>
      <div className="py-8">
        <Calendar events={events} />
      </div>
    </>
  )
}
