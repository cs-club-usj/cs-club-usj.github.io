import { Event } from 'contentlayer/generated'
import Image from './Image'
import Link from './Link'
import { CalendarDays, MapPin, User } from 'lucide-react'
import { CoreContent } from 'pliny/utils/contentlayer'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

const Card = async ({ event }: { event: CoreContent<Event> }) => {
  const { flyer, slug, title, date, location, speaker } = event

  const filePath = path.join(process.cwd(), 'public', flyer)
  const buffer = fs.readFileSync(filePath)
  const { base64: flyerBlur } = await getPlaiceholder(buffer)

  return (
    <div className="p-4">
      <div
        className={`${
          flyer && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {flyer &&
          (slug ? (
            <Link href={`/events/${slug}`} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={flyer}
                placeholder="blur"
                blurDataURL={flyerBlur}
                className="aspect-4/5 w-full object-cover object-center"
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
              className="w-full object-cover object-center md:h-36 lg:h-56"
              width={1080}
              height={1350}
            />
          ))}

        <div className="flex flex-col gap-3 p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {slug ? (
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
          </h2>
          <div>
            <p className="flex flex-row items-center gap-2 text-sm">
              <CalendarDays className="min-h-6 min-w-6" /> {new Date(date).toDateString()}
            </p>
          </div>
          <p className="flex flex-row items-center gap-2 text-sm">
            <MapPin className="min-h-6 min-w-6" />
            {location}
          </p>
          <p className="flex flex-row items-center gap-2 text-sm">
            <User className="min-h-6 min-w-6" />
            {speaker}
          </p>
          {slug && (
            <Link
              href={`/events/${slug}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              View gallery &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
