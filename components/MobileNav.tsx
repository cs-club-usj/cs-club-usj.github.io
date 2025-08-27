'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/navLinks/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => {
    return clearAllBodyScrollLocks
  })

  return (
    <>
      <button 
        aria-label="Toggle Menu" 
        onClick={onToggleNav} 
        className="group relative sm:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        <div className="relative w-6 h-6">
          <span 
            className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 origin-left ${
              navShow ? 'rotate-45 translate-y-0.5' : ''
            }`}
          />
          <span 
            className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
              navShow ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 origin-left ${
              navShow ? '-rotate-45 -translate-y-0.5' : ''
            }`}
          />
        </div>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-250 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            unmount={false}
          >
            <DialogPanel className="fixed right-0 top-0 z-50 h-full w-80 max-w-sm bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50">
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Menu
                </div>
                <button
                  className="group p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close Menu"
                  onClick={onToggleNav}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    className="w-5 h-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100 transition-colors"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <nav
                ref={navRef}
                className="flex flex-col p-6 space-y-2 overflow-y-auto h-full"
              >
                {headerNavLinks.map((link, index) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group relative px-4 py-3 rounded-xl text-lg font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-gray-50 dark:focus:bg-gray-800/50"
                    onClick={onToggleNav}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: navShow ? 'slideInUp 0.3s ease-out forwards' : ''
                    }}
                  >
                    <span className="relative z-10">{link.title}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
                <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-50" />
                  </div>
                </div>
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default MobileNav