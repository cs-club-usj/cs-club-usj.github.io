import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '404' })

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black">
            404
          </h1>
        </div>
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Sorry, we couldn't find this page.
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
  );
}