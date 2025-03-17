"use client"

import { useState, useEffect } from "react"
import type { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"

interface UserPanelProps {
  user: User
}

export default function UserPanel({ user }: UserPanelProps) {
  const [joinDate, setJoinDate] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("")

  // Get user's first name or username
  const displayName = user.name?.split(" ")[0] || user.email?.split("@")[0] || "User"

  // Set avatar fallback text (initials)
  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return user.email?.[0].toUpperCase() || "U"
  }

  useEffect(() => {
    // Set join date (for demo purposes using current date)
    const now = new Date()
    setJoinDate(now.toLocaleDateString())

    // Update current time every minute
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-700">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">Welcome back, {displayName}!</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground mt-2 sm:mt-0">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>Joined: {joinDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

