import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '404' })

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative z-10 px-4 text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-black md:text-9xl">404</h1>
        </div>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
            Page Not Found
          </h2>
          <p className="mb-12 text-gray-600 dark:text-gray-300">
            Sorry, we couldn't find this page. But don't worry, you can find plenty of other things
            on our homepage.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex w-fit items-center justify-center rounded-md bg-primary-600 p-4 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
