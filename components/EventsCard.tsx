import { Event } from 'contentlayer/generated'
import Image from './Image'
import Link from './Link'
import { CalendarDays, MapPin, User } from 'lucide-react'
import { CoreContent } from 'pliny/utils/contentlayer'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import Arrow from './Arrow'

const EventsCard = async ({
  event,
  isLandscape = false,
}: {
  event: CoreContent<Event>
  isLandscape?: boolean
}) => {
  const { flyer, slug, title, date, location, speaker, upcoming, gallery, more } = event

  const filePath = path.join(process.cwd(), 'public', flyer)
  const buffer = fs.readFileSync(filePath)
  const { base64: flyerBlur } = await getPlaiceholder(buffer)

  return (
    <div className="p-2">
      <div
        className={`${
          flyer && 'h-full'
        } flex overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ${isLandscape ? 'flex-col md:flex-row' : 'flex-col'}`}
      >
        {flyer && !upcoming ? (
          <Link
            href={`/blog/${slug}`}
            aria-label={`Link to ${title}`}
            className={`${isLandscape ? 'w-full md:w-1/4' : 'w-full'}`}
          >
            <Image
              alt={title}
              src={flyer}
              placeholder="blur"
              blurDataURL={flyerBlur}
              className={`h-full w-full object-cover object-center`}
              width={1080}
              height={1350}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={flyer}
            placeholder="blur"
            blurDataURL={flyerBlur}
            className={`${isLandscape ? 'w-full md:w-1/4' : 'w-full'} object-cover object-center`}
            width={1080}
            height={1350}
          />
        )}

        <div
          className={`flex flex-col p-6 ${isLandscape ? 'w-full md:w-3/4 md:justify-center' : 'w-full'} h-full`}
        >
          <h2 className="flex flex-col gap-3 text-2xl font-bold leading-8 tracking-tight">
            {slug && !upcoming ? (
              <Link
                href={`/blog/${slug}`}
                aria-label={`Link to ${title}`}
                className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-500"
              >
                {title}
              </Link>
            ) : (
              title
            )}
            {upcoming && (
              <span className="w-fit rounded-md bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                Upcoming
              </span>
            )}
          </h2>
          <div className="flex flex-grow flex-col items-start justify-center gap-2 py-4 text-sm">
            <p className="flex flex-row items-center gap-2 whitespace-pre-line">
              <CalendarDays className="min-h-6 min-w-6" /> {new Date(date).toDateString()}
            </p>
            <p className="flex flex-row items-center gap-2 whitespace-pre-line">
              <MapPin className="min-h-6 min-w-6" />
              {location}
            </p>
            {speaker && (
              <p className="flex flex-row items-center gap-2 whitespace-pre-line">
                <User className="min-h-6 min-w-6" />
                {speaker}
              </p>
            )}
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <Link
              href={`/blog/${more}`}
              className="text-base font-medium leading-6 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-600"
              aria-label={`Link to ${title}`}
            >
              <Arrow direction="right">Read more</Arrow>
            </Link>
            {slug && !upcoming && gallery && (
              <Link
                href={`/events/${slug}`}
                className="text-base font-medium leading-6 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-600"
                aria-label={`Link to ${title}`}
              >
                <Arrow direction="right">View gallery</Arrow>
              </Link>
            )}
            {slug && !upcoming && !gallery && (
              <Link
                href={`/events/${slug}`}
                className="text-base font-medium leading-6 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-600"
                aria-label={`Link to ${title}`}
              >
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsCard
