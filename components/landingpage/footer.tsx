"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react"

const Footer = () => {
  return (
    <>
      <footer className="relative bg-neutral-100 dark:bg-black">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand Section - Full width on mobile */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl blur-sm transition-all duration-300" />
                      <Image
                        src="/logo.jpg"
                        width={32}
                        height={32}
                        alt="Bloggify Logo"
                        unoptimized
                        className="relative rounded-xl ring-2 transition-all duration-300 sm:w-10 sm:h-10"
                      />
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Bloggify
                    </span>
                  </Link>
                </div>

                <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed max-w-md">
                  The mindful scroll for modern storytellers. Create, share, and discover inspiring content that matters.
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <span>Building in public at</span>
                  <Link
                    href="https://layrdui.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    @LayrdUI
                    <ExternalLink className="size-3" />
                  </Link>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link
                    href="https://twitter.com/dhruvtripathi77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group touch-manipulation"
                  >
                    <Twitter className="size-4 sm:size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dhruv-tripathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group touch-manipulation"
                  >
                    <Linkedin className="size-4 sm:size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                  </Link>
                  <Link
                    href="https://github.com/dhruv7tripathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group touch-manipulation"
                  >
                    <Github className="size-4 sm:size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                  </Link>
                </div>
              </div>

              {/* Navigation Links - Mobile optimized layout */}
              <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-24 lg:col-span-2 lg:ml-24 lg:justify-end">

                {/* Navigation Column */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Navigation</h4>
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    {[
                      { href: "/write", label: "Write" },
                      { href: "/allpost", label: "Blogs" },
                      { href: "/about", label: "About" },
                      { href: "/contactus", label: "Contact" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center gap-2 touch-manipulation py-1"
                      >
                        <span className="text-sm sm:text-base">{link.label}</span>
                        <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Resources Column */}
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-4 sm:mb-6 text-base sm:text-lg">Resources</h4>
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    {[
                      { href: "/privacy", label: "Privacy Policy" },
                      { href: "/terms", label: "Terms of Service" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center gap-2 touch-manipulation py-1"
                      >
                        <span className="text-sm sm:text-base">{link.label}</span>
                        <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Top border gradient */}
        <div
          className="absolute w-full h-px top-0 left-0 z-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </footer>
    </>
  )
}

export default Footer