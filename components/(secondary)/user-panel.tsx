"use client"

import type { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface UserPanelProps {
  user: User
}

export default function UserPanel({ user }: UserPanelProps) {

  const displayName = user.name?.split(" ")[0] || user.email?.split("@")[0] || "User"

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
  return (
    <Card className="mb-6 bg-background dark:from-gray-800 dark:to-gray-900 border-black dark:border-black">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-gray-500">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-emerald-700 dark:bg-emerald-800 dark:text-blue-200">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">Welcome, {displayName}!</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

