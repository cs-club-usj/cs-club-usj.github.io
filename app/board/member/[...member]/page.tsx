import { Authors, allAuthors, allBoards, Boards } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout2 from '@/layouts/AuthorLayout2'
import { coreContent } from 'pliny/utils/contentlayer'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export async function generateMetadata(props: {
  params: Promise<{ member: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const member = decodeURI(params.member.join('/'))
  const author = allAuthors.find((p) => p.slug === member) as Authors

  const imageList = [author.avatar]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: `About ${author.name}`,
    description: author.about,
    openGraph: {
      title: `About ${author.name}`,
      description: author.about,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'profile',
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: `About ${author.name}`,
      description: author.about,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allAuthors.map((p) => ({ member: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ member: string[] }> }) {
  const params = await props.params
  const memberSlug = decodeURI(params.member.join('/'))
  const author = allAuthors.find((a) => a.slug === memberSlug) as Authors
  const mainContent = coreContent(author)

  const resolveBoardMembers = (board: Boards) =>
    board.members
      .map((m) => allAuthors.find((a) => a.slug === m.name))
      .filter(Boolean) as Authors[]

  const candidateBoards = allBoards.filter((b) =>
    b.members.some((m) => m.name === author.slug)
  )
  const chosenBoard = candidateBoards.find((b) => b.year === '2025-2026') ?? candidateBoards[0]

  let membersList = chosenBoard ? resolveBoardMembers(chosenBoard) : allAuthors
  const index = membersList.findIndex((a) => a.slug === author.slug)
  const prevProp =
    index > 0 ? { path: `board/member/${membersList[index - 1].slug}`, title: membersList[index - 1].name } : undefined
  const nextProp =
    index >= 0 && index < membersList.length - 1
      ? { path: `board/member/${membersList[index + 1].slug}`, title: membersList[index + 1].name }
      : undefined

  return (
    <AuthorLayout2 content={mainContent} prev={prevProp} next={nextProp}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout2>
  )
}
