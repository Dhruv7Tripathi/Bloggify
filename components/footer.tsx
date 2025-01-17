// components/Footer.tsx
// import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white-50 border-t border-gray-200 py-20 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">

          <div className="mb-6 md:mb-0 flex items-center">
            <img src="/logo.jpg" alt="logo" className="h-10 w-10 mr-3 rounded-full border border-gray-200" />
            <div>
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Blogify</h3>

              <p className="text-black-900 text-sm">
                Building in public at{' '}
                <a
                  href="https://twitter.com/dhruvtripathi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  @dhruvtripathi
                </a>
              </p>
            </div>
          </div>


          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-black-900 mb-3">Home</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/pricing" className="text-black-900 hover:text-black-900">about</Link>
                </li>
                <li>
                  <Link href="/components" className="text-black-900 hover:text-gray-900">blogs</Link>
                </li>
                <li>
                  <Link href="/templates" className="text-black-900 hover:text-gray-900">contactUs</Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-medium text-black-900 mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-black-900 hover:text-gray-900">About</Link>
                </li>


              </ul>
            </div> */}
            <div>
              <h4 className="font-medium text-black-900 mb-3">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black-900 hover:text-gray-900">Twitter</a>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-black-900 hover:text-gray-900">Linkdin</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        {/* <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Aceternity UI. All rights reserved.
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;