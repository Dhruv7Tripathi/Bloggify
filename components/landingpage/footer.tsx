"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-muted/30">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                    <Image
                      src="/logo.jpg"
                      width={40}
                      height={40}
                      alt="Bloggify Logo"
                      unoptimized
                      className="relative rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Bloggify
                  </span>
                </Link>
              </div>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-md">
                The mindful scroll for modern storytellers. Create, share, and discover inspiring content that matters.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span>Building in public at</span>
                <Link
                  href="https://twitter.com/dhruvtripathi77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  @dhruv7tripathi
                  <ExternalLink className="size-3" />
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="https://twitter.com/dhruvtripathi77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group"
                >
                  <Twitter className="size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/dhruv-tripathi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group"
                >
                  <Linkedin className="size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                </Link>
                <Link
                  href="https://github.com/dhruv7tripathi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-border hover:scale-110 transition-all duration-300 group"
                >
                  <Github className="size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-6 text-lg">Navigation</h4>
              <div className="flex flex-col space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/blog", label: "Blog" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Resources</h4>
              <div className="flex flex-col space-y-4">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground text-center">
              <span>Made with</span>
              <Heart className="size-4 text-red-500 fill-current animate-pulse" />
              <span>by</span>
              <Link
                href="https://github.com/dhruv7tripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Dhruv Tripathi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
