import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Arrow from '@/components/Arrow'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function AuthorLayout2({ children, content, next, prev }: Props) {
  const { name, avatar, email, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Biography - {name}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="email" href={`mailto:${email}`} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="github" href={github} />
            </div>
            {(next || prev) && (
              <div className="w-3/4">
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && prev.path && (
                    <Link href={`/${prev.path}`}>
                      <div className="mb-3 rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <h2 className="uppercase tracking-wide mb-1 text-gray-500 dark:text-gray-400">
                          Previous Biography
                        </h2>
                        <h3 className="text-base font-semibold mb-1">{prev.title}</h3>
                        <span className="text-primary-500 text-primary-600">
                          <Arrow direction="left">Read More</Arrow>
                        </span>
                      </div>
                    </Link>
                  )}
                  {next && next.path && (
                    <Link href={`/${next.path}`}>
                      <div className="rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <h2 className="uppercase tracking-wide mb-2 text-gray-500 dark:text-gray-400">
                          Next Biography
                        </h2>
                        <h3 className="text-base font-semibold mb-2">{next.title}</h3>
                        <span className="text-primary-600 dark:text-primary-500">
                          <Arrow direction="right">Read More</Arrow>
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="w-3/4">
              <Link
                href="/board"
                className="py-3 group flex w-full items-center justify-center space-x-2 rounded-md bg-primary-600 font-semibold text-white transition-colors hover:bg-primary-700"
                aria-label="Back to board"
              >
                <Arrow direction="left">Back to board</Arrow>
              </Link>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

