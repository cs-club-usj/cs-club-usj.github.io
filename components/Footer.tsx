'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import footerNavLinks from '@/data/navLinks/footerNavLinks'

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="border-t border-gray-200 px-4 pb-8 pt-8 dark:border-gray-700 md:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {siteMetadata.title}
            </h3>
            <p className="font-semibold text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <nav className="space-y-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <div className="grid grid-cols-3 gap-2">
              {footerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-semibold text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="space-y-4 text-center md:text-center">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Connect With Us</h4>
            <div className="flex justify-center  space-x-5">
              <SocialIcon kind="email" href={`mailto:${siteMetadata.email}`} size={6} />
              <SocialIcon kind="whatsapp" href={siteMetadata.whatsapp} size={6} />
              <SocialIcon
                kind="instagram"
                href={`https://www.instagram.com/${siteMetadata.instagram}`}
                size={6}
              />
              <SocialIcon
                kind="linkedin"
                href={`https://www.linkedin.com/company/${siteMetadata.linkedin}`}
                size={6}
              />
              <SocialIcon
                kind="github"
                href={`https://github.com/${siteMetadata.github}`}
                size={6}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-6 text-sm text-gray-500 dark:text-gray-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {siteMetadata.title}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
