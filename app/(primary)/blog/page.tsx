"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Loader2, Share2, Pen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import SharePostDialog from "@/components/(secondary)/share-post-dialog"
import NavigationSidebar from "@/components/(secondary)/sidebar"

interface Post {
  id: string
  timestamp?: Date
  title: string
  content: string
  created_at: string
  updated_at?: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [, setTitle] = useState("")
  const [, setContent] = useState("")
  const [, setEditingPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [isUpdating,] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [sharePost, setSharePost] = useState<Post | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated") {
      fetchPosts()
    }
  }, [status, router])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const userId = session?.user?.id

      if (!userId) {
        setError("Please log in to view your posts")
        return
      }
      const response = await axios.get(`/api/posts/get/${encodeURIComponent(userId)}`)
      if (response.data) {
        setPosts(response.data)
      } else {
        setPosts([])
        console.log("No posts found for this user")
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>

      if (axiosError.response?.status === 404) {
        console.error("API route not found:", `/api/posts/get/${session?.user?.id}`)
        setError("The API endpoint for fetching posts does not exist. Please check your server setup.")
      } else {
        console.error("Failed to fetch posts:", axiosError.response?.data || axiosError.message)
        setError(axiosError.response?.data?.message || "Failed to fetch posts. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }
  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/posts/delete/${id}`)
      setPosts((prev) => prev.filter((post) => post.id !== id))
      setSuccess("Post deleted successfully!")
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to delete post:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to delete post. Please try again later.")
    } finally {
      setLoading(false)
    }
  }


  const handleEdit = (post: Post) => {
    router.push(`/write?edit=${post.id}`)
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content)
    setError("")
    setSuccess("")
  }
  const handleShare = (post: Post) => {
    setSharePost(post)
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
      <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">My Posts</h1>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button variant="default" onClick={() => router.push("/write")}>
              <Pen className="w-4 h-4 mr-2" />
              Write
            </Button>
            <Button variant="outline" onClick={() => router.push("/allpost")}>
              View All Posts
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available. Create the first one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  {/* <p className="text-sm text-muted-foreground">{formatDate(post.created_at)}</p> */}
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap line-clamp-4">{post.content}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)} disabled={loading || isUpdating}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    disabled={loading || isUpdating}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleShare(post)}
                    disabled={loading || isUpdating}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {sharePost && <SharePostDialog post={sharePost} isOpen={!!sharePost} onClose={() => setSharePost(null)} />}
      </div>
    </div>
  )
}