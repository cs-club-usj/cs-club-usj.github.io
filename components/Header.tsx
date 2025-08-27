import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/navLinks/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from './Image'

const SVE_LINK = 'https://usj.edu.lb/sve-new/'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="flex items-center justify-between">
        <div className="mr-3 flex flex-row items-center space-x-2">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <Logo />
          </Link>
          <Link href={SVE_LINK}>
            <Image
              src={'/static/images/sve/sve-light.png'}
              alt={'SVE Logo Light'}
              width={180}
              height={128}
              className="block object-contain dark:hidden"
            />
            <Image
              src={'/static/images/sve/sve-dark.png'}
              alt={'SVE Logo Dark'}
              width={180}
              height={128}
              className="hidden object-contain dark:block"
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto pr-2 sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-xl m-1 block font-medium text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-500 transition-colors"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
