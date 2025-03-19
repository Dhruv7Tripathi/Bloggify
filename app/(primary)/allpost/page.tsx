"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NavigationSidebar from "@/components/sidebar"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  user: {
    id: string
    name: string
    image?: string
  }
}

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated") {
      fetchAllPosts()
    }
  }, [status, router])

  const fetchAllPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/posts/all")
      setPosts(response.data)
    } catch (error) {
      console.error("Failed to fetch all posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <NavigationSidebar />
      <div className="flex-1 container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">All Blog Posts</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.user.image || ""} alt={post.user.name} />
                      <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.user.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Posted on {new Date(post.created_at).toLocaleDateString()} at{" "}
                  {new Date(post.created_at).toLocaleTimeString()}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

