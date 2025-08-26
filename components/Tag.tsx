import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-600 transition-colors"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
