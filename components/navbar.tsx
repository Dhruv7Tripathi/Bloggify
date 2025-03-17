'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { navItems } from '@/contants';
import AnchorNav from './anchor-nav';
import { useSession } from 'next-auth/react';
import UserAccountNav from './userAccountNav';
import SignInButton from './SIgnInButton';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'posts', href: '/blog' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];
  return (
    <nav className="z-50 sticky top-0 w-full dark:bg-zinc-950/10 bg-white/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border-b border-primary/10">
      <div className="max-w-[88rem] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1">
              <Image
                src="/logo.png"
                width={30}
                height={30}
                priority={false}
                alt="Logo"
                unoptimized={true}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold">Bloggify</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <AnchorNav
                key={item.name + item.href}
                activeClassName="text-black dark:text-white font-semibold"
                absolute
                href={item.href}
              >
                {item.name}
              </AnchorNav>
            ))}
            <div className="flex items-center space-x-6">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton text={"Sign In"} />
              )}
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-950/95 backdrop-blur-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name + item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;