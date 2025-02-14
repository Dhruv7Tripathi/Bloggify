'use client';

import Image from 'next/image';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
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
              Welcome to our blog! We&apos;re passionate about sharing knowledge and insights
              about technology, development, and digital innovation. Our mission is to
              create valuable content that helps developers and tech enthusiasts stay
              ahead in this ever-evolving industry.
            </p>
            <p className="text-muted-foreground">
              Founded in 2024, we&apos;ve been committed to delivering high-quality articles,
              tutorials, and industry insights to our growing community of readers.
            </p>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            <a href="https://twitter.com/dhruvtripathi" className="hover:text-primary transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://github.com/Dhruv7Tripathi" className="hover:text-primary transition-colors">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/" className="hover:text-primary transition-colors">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}