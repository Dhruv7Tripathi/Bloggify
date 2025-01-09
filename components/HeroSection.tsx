// components/HeroSection.tsx
import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-start xl:px-0 px-8">
      {/* SVG Line */}
      <svg
        width="236"
        height="68"
        viewBox="0 0 236 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block"
      >
        <path
          d="M0.5 0.5H89C90.6569 0.5 92 1.84315 92 3.5V29C92 30.6569 93.3431 32 95 32H148.5C150.157 32 151.5 33.3431 151.5 35V64C151.5 65.6569 152.843 67 154.5 67H235.5"
          stroke="url(#paint0_linear)"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear"
            gradientUnits="userSpaceOnUse"
            x1="-51.16999999999905"
            y1="0"
            x2="-35.685749999998734"
            y2="6.425000000000125"
          >
            <stop stopColor="#2EB9DF" stopOpacity="0"></stop>
            <stop stopColor="#2EB9DF"></stop>
            <stop offset="1" stopColor="#9E00FF" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Button */}
      <button
        className="bg-neutral-50 dark:bg-neutral-700 no-underline group cursor-pointer relative md:shadow-2xl shadow-zinc-900 rounded-full p-px text-[10px] sm:text-xs font-semibold leading-6 text-neutral-700 dark:text-neutral-200 inline-block w-fit mb-4"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>

        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-neutral-400/0 via-neutral-400/90 to-neutral-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>

      {/* Title */}
      <h1 className="text-4xl md:text-7xl font-bold mb-6 relative text-left dark:text-zinc-100 text-zinc-700 max-w-4xl">
        Make your websites look <br />
        10x <span className="z-10 inline-block relative">modern</span>
      </h1>

      {/* Subtitle */}
      <h2 className="relative text-sm sm:text-xl text-zinc-500 dark:text-zinc-300 tracking-wide mb-8 text-left max-w-2xl antialiased leading-loose">
        Copy paste the most trending components and use them in your websites without having to worry about styling and animations.
      </h2>

      {/* Buttons */}
      <div className="flex relative sm:flex-row flex-col space-y-2 justify-center sm:space-y-0 sm:space-x-4 sm:justify-start mb-4 w-full">
        <Link
          href="/components"
          className="bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer relative hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold text-white px-4 py-2 w-full sm:w-52 h-14 rounded-2xl text-sm text-center items-center justify-center"
        >
          Browse Components
        </Link>
        <Link
          href="/pricing"
          className="w-full sm:w-52 text-sm text-black bg-white dark:bg-black h-14 border border-transparent dark:text-white dark:border-neutral-600 flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        >
          Custom Components
        </Link>
      </div>



    </div>
  );
};

export default HeroSection;
