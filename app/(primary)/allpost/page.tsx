"use client"

import { useEffect, useState } from "react"
import { Loader2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import NavigationSidebar from "@/components/(secondary)/sidebar"
// import UserPanel from "@/components/(secondary)/user-panel"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  updated_at?: string
  user: {
    id: string
    name?: string
    email?: string
    image?: string
  }
  _count?: {
    // likes: number
    comments: number
  }
}

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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
      setPosts(response.data || [])
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to fetch posts:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to fetch posts. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  if (status === "loading") {
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
      <div className="flex-1" style={{ marginLeft: "200px", marginRight: "400px" }}>
        <div className="container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">All Posts</h1>
            <Button variant="outline" className="mt-2 md:mt-0 bg-transparent" onClick={() => router.push("/")}>
              My Posts
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {posts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`} className="block">
                  <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.user.image || ""} alt={post.user.name || ""} />
                          <AvatarFallback>
                            {post.user.name?.charAt(0) || post.user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{post.user.name || post.user.email}</span>
                      </div>
                      <CardTitle className="text-lg font-semibold text-white mb-1">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="whitespace-pre-wrap line-clamp-4 text-muted-foreground">{post.content}</p>
                    </CardContent>
                    <CardFooter className="pt-4 space-y-3">
                      <div className="flex items-center justify-between w-full">
                        {/* <LikeDislike postId={post.id} /> */}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post._count?.comments || 0}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
