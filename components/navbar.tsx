import Link from "next/link";
import { ModeToggle } from "./ui/DarkMode";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center">

            <span className="text-blue-600 dark:text-blue-400">KaiBlog</span>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
          <Link
            href="#meet"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="#contactus"
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

        {/* Action Buttons Section */}
        <div className="flex items-center gap-4">
          <button className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            Login
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}