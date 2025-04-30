'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 px-8 py-20 bg-white dark:bg-black">
      <div className="max-w-[87rem] mx-auto text-sm px-4 flex sm:flex-row flex-col justify-between items-start text-black dark:text-white">
        <div>
          <div className="mb-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                width={30}
                height={30}
                alt="Logo"
                unoptimized
                className="rounded-xl"
              />
              <span className="text-2xl font-extrabold">Bloggify</span>
            </Link>
          </div>
          <div className="mt-2">
            Building in public at
            <a
              className="pl-1 font-medium text-emerald-600 dark:text-emerald-400"
              target="_blank"
              href="https://github.com/dhruv7tripathi"
              rel="noopener noreferrer"
            >
              @dhruv7tripathi
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 items-start mt-10 sm:mt-0">
          <div className="flex flex-col space-y-4 mt-4">
            <Link href='/'><p className="hover:text-neutral-700 dark:hover:text-neutral-300">Home</p></Link>
            <Link href='/blog'><p className="hover:text-neutral-700 dark:hover:text-neutral-300">Blogs</p></Link>
            <Link href='/contact'><p className="hover:text-neutral-700 dark:hover:text-neutral-300">Contact</p></Link>
            <Link href='/about'><p className="hover:text-neutral-700 dark:hover:text-neutral-300">About</p></Link>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <Link href='https://twitter.com/dhruvtripathi' target="_blank">
              <p className="hover:text-neutral-700 dark:hover:text-neutral-300">Twitter</p>
            </Link>
            <Link href='https://www.linkedin.com/in/dhruv-tripathi' target="_blank">
              <p className="hover:text-neutral-700 dark:hover:text-neutral-300">LinkedIn</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
