import { Event } from 'contentlayer/generated'
import Image from './Image'
import Link from './Link'
import { CalendarDays, MapPin, User } from 'lucide-react'
import { CoreContent } from 'pliny/utils/contentlayer'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

const Card = async ({
  event,
  isLandscape = false,
}: {
  event: CoreContent<Event>
  isLandscape?: boolean
}) => {
  const { flyer, slug, title, date, location, speaker, upcoming, more } = event

  const filePath = path.join(process.cwd(), 'public', flyer)
  const buffer = fs.readFileSync(filePath)
  const { base64: flyerBlur } = await getPlaiceholder(buffer)

  return (
    <div className="p-4">
      <div
        className={`${
          flyer && 'h-full'
        } flex overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ${isLandscape ? 'flex-col md:flex-row' : 'flex-col'}`}
      >
        {flyer && !upcoming ? (
          <Link
            href={`/events/${slug}`}
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
          className={`flex h-full flex-col gap-3 p-6 ${isLandscape ? 'w-full md:w-3/4 md:justify-center' : 'w-full'}`}
        >
          <h2 className="mb-3 flex flex-col gap-3 text-2xl font-bold leading-8 tracking-tight">
            {slug && !upcoming ? (
              <Link
                href={`/events/${slug}`}
                aria-label={`Link to ${title}`}
                className="transition-colors hover:text-primary-600"
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
          <div>
            <p className="flex flex-row items-center gap-2 text-sm">
              <CalendarDays className="min-h-6 min-w-6" /> {new Date(date).toDateString()}
            </p>
          </div>
          <p className="flex flex-row items-start gap-2 text-sm">
            <MapPin className="min-h-6 min-w-6" />
            {location}
          </p>
          {speaker && (
            <p className="flex flex-row items-start gap-2 text-sm">
              <User className="min-h-6 min-w-6" />
              {speaker}
            </p>
          )}
          <div className="mt-auto flex flex-col gap-2 justify-self-end">
            {slug && !upcoming && (
              <Link
                href={`/events/${slug}`}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                View gallery &rarr;
              </Link>
            )}
            <Link
              href={`/blog/${more}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
