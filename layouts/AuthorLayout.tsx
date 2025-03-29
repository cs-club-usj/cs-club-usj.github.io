import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default async function AuthorLayout({ content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  const filePath = path.join(process.cwd(), 'public', avatar!)
  const buffer = fs.readFileSync(filePath)
  const { base64 } = await getPlaiceholder(buffer)

  return (
    <div className="flex flex-col items-center space-x-2 pt-8">
      {avatar && (
        <Image
          src={avatar}
          alt="avatar"
          width={192}
          height={192}
          placeholder="blur"
          blurDataURL={base64}
          className="h-48 w-48 rounded-full"
        />
      )}
      <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
      <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
      <div className="text-gray-500 dark:text-gray-400">{company}</div>
      <div className="flex space-x-3 pt-6">
        <SocialIcon kind="mail" href={`mailto:${email}`} />
        <SocialIcon kind="github" href={github} />
        <SocialIcon kind="linkedin" href={linkedin} />
        <SocialIcon kind="x" href={twitter} />
        <SocialIcon kind="bluesky" href={bluesky} />
      </div>
    </div>
  )
}
