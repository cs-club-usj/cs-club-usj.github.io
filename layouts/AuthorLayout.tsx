import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import Link from 'next/link'

interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  role: string
}

export default async function AuthorLayout({ content, role }: Props) {
  const { name, avatar, email, linkedin, github, slug } = content

  const filePath = path.join(process.cwd(), 'public', avatar!)
  const buffer = fs.readFileSync(filePath)
  const { base64 } = await getPlaiceholder(buffer)

  return (
    <div className="flex flex-col items-center space-x-2 pt-8">
      {avatar && (
        <Link href={`/board/member/${slug}`} className="transition-colors hover:text-primary-600">
          <Image
            src={avatar}
            alt="avatar"
            width={192}
            height={192}
            placeholder="blur"
            blurDataURL={base64}
            className="h-48 w-48 cursor-pointer rounded-full"
          />
        </Link>
      )}
      <Link href={`/board/member/${slug}`} className="transition-colors hover:text-primary-600">
        <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
      </Link>
      <div className="text-gray-500 dark:text-gray-400">{role}</div>
      <div className="flex space-x-3 pt-6">
        <SocialIcon kind="email" href={`mailto:${email}`} />
        <SocialIcon kind="linkedin" href={linkedin} />
        <SocialIcon kind="github" href={github} />
      </div>
    </div>
  )
}
