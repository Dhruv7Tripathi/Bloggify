'use client';

import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/blog.avif"
              alt="Blog workspace"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground">
              Welcome to our blog! We're passionate about sharing knowledge and insights
              about technology, development, and digital innovation. Our mission is to
              create valuable content that helps developers and tech enthusiasts stay
              ahead in this ever-evolving industry.
            </p>
            <p className="text-muted-foreground">
              Founded in 2024, we've been committed to delivering high-quality articles,
              tutorials, and industry insights to our growing community of readers.
            </p>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Connect With Us</h2>
          {/* <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <LinkedinIcon className="h-6 w-6" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}