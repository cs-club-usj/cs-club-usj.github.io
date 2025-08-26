'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import footerNavLinks from '@/data/footerNavLinks'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-20">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-8 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 mb-6 gap-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {siteMetadata.title}
            </h3>
            <p className="font-semibold text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <nav className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {footerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="text-center md:text-center space-y-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              Connect With Us
            </h4>
            <div className="flex justify-center  space-x-5">
              <SocialIcon kind="email" href={`mailto:${siteMetadata.email}`} size={6} />
              <SocialIcon kind="whatsapp" href={siteMetadata.whatsapp} size={6} />
              <SocialIcon kind="instagram" href={`https://www.instagram.com/${siteMetadata.instagram}`} size={6} />
              <SocialIcon kind="linkedin" href={`https://www.linkedin.com/company/${siteMetadata.linkedin}`} size={6} />
              <SocialIcon kind="github" href={`https://github.com/${siteMetadata.github}`} size={6} />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center pt-6 text-gray-500 dark:text-gray-400 text-sm">
          <span>© {new Date().getFullYear()} {siteMetadata.title}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
