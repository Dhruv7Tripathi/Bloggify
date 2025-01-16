// components/HeroSection.tsx
import React from 'react';
import Cards from './cards';
const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 py-20">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          The Mindful Scroll: Insights, Stories, and Inspiration
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
          Dive into a world of ideas and inspiration with &apos;The Mindful Scroll.&apos; A curated blog that brings you thought-provoking insights, captivating stories, and practical tips on topics you care about. From personal growth and lifestyle to tech trends and creativity, we’ve got your curiosity covered. Discover, reflect, and stay inspired.

        </p>
        <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
          <a
            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-blue-500 dark:highlight-white/20 dark:hover:bg-blue-400"
            href="/blog"
          >
            Get started
          </a>

        </div>
      </div>
      <Cards />
    </>
  );
};

export default HeroSection;
