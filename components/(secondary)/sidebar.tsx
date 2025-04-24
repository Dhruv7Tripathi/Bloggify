"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, User, Users, Contact, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { signOut } from "next-auth/react"

export default function NavigationBar() {
  const pathname = usePathname()
  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Profile", icon: User, href: "/blog" },
    { name: "Posts", icon: Users, href: " /allpost" },
    { name: "about", icon: Info, href: "/about" },
    { name: "contactus", icon: Contact, href: "/contactus" },

  ]

  const isActive = (path: string) => pathname === path

  return (
    <>
      <div className="hidden md:flex fixed left-0 top-4 bottom-0 w-16 bg-background border-r flex-col items-center py-8 z-10">
        <div className="flex flex-col items-center gap-6 flex-1">
          <TooltipProvider delayDuration={300}>
            {navItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10"
                      aria-label={item.name}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 mt-auto"
                onClick={() => signOut()}
                aria-label="Log Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent side="right">Log Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-10">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex-1">
              <div className="flex flex-col items-center py-2">
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9 mb-1"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
                <span className="text-xs">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Content Margin Adjustment */}
      <div className="md:ml-16 mb-16 md:mb-0">
        {/* This is where your main content will go */}
      </div>
    </>
  )
}