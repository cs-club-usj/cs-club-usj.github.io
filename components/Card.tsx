import { Event } from '@/data/projectsData'
import Image from './Image'
import Link from './Link'
import { CalendarDays, MapPin, User } from 'lucide-react'

const Card = ({ event }: { event: Event }) => {
  const { imgSrc, slug, title, description, date, location, speakers } = event
  return (
    <div className="p-4">
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (slug ? (
            // <Link href={slug} aria-label={`Link to ${title}`}>
            // </Link>
            <Image
              alt={title}
              src={imgSrc}
              className="aspect-4/5 object-cover object-center"
              width={544}
              height={306}
            />
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-56"
              width={544}
              height={306}
            />
          ))}

        <div className="flex flex-col gap-3 p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {title}
            {/* {slug ? (
              <Link href={slug} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )} */}
          </h2>
          <div>
            <p className="flex flex-row items-center gap-2 text-sm">
              <CalendarDays className="min-h-6 min-w-6" /> {date}
            </p>
          </div>
          <p className="flex flex-row items-center gap-2 text-sm">
            <MapPin className="min-h-6 min-w-6" />
            {location}
          </p>
          <p className="flex flex-row items-center gap-2 text-sm">
            <User className="min-h-6 min-w-6" />
            {speakers}
          </p>
          {/* <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p> */}
          {/* {slug && (
            <Link
              href={slug}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Card
