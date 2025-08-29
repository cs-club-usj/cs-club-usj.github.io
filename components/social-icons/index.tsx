import {
  Email,
  Whatsapp,
  Instagram,
  Threads,
  Youtube,
  Facebook,
  Twitter,
  X,
  Linkedin,
  Bluesky,
  Github,
  Medium,
  Mastodon,
} from './icons'

const components = {
  email: Email,
  whatsapp: Whatsapp,
  instagram: Instagram,
  threads: Threads,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  x: X,
  linkedin: Linkedin,
  bluesky: Bluesky,
  github: Github,
  medium: Medium,
  mastodon: Mastodon,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'email' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-500 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
