import { ArrowRight } from 'lucide-react';
import React from 'react';
const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 py-20">
        <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
            The Mindful Scroll:
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-green-400 dark:via-emerald-300 dark:to-green-400">
            Insights, Stories, and Inspiration
          </span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Dive into a world of ideas and inspiration with <span className="font-semibold text-gray-900 dark:text-white">The Mindful Scroll.</span> A curated blog that brings you thought-provoking insights, captivating stories, and practical tips on topics you care about.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/blog"
            className="group relative px-8 py-4 bg-emerald-600 dark:bg-green-500 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-green-500 dark:hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 dark:hover:shadow-green-400/30"
          >
            <span className="flex items-center gap-2">
              Get started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="/about"
            className="group px-8 py-4 text-gray-600 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
