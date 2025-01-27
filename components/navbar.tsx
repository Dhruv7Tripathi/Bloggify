"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/DarkMode";
import { Menu as HamIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import UserAccountNav from "./userAccountNav";
import SignInButton from "./SIgnInButton";
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="text-l font-bold">
          <Link href="/" className="flex items-center">
            <img src="/logo.webp" alt="logo" className="h-10 w-10 mr-3 rounded-full border border-gray-200" />
            <span className="text-blue-600 dark:text-blue-400">Blogify</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
          <Link
            href="/"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contactus"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            ContactUs
          </Link>
          <Link
            href="/blog"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text={"Sign In"} />
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <HamIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>KaiBlog</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4 text-gray-700 dark:text-gray-300">
                <Link
                  href="/"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contactus"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  ContactUs
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
