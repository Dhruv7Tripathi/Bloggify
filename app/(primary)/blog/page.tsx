"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { PlusCircle, Loader2, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import UserPanel from "@/components/(secondary)/user-panel"
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
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (status !== "authenticated") {
      setError("You must be logged in to create a post.")
      return
    }

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.")
      return
    }

    try {
      if (editingPost) {
        setIsUpdating(true)
        const response = await axios.put(`/api/posts/update/${editingPost.id}`, {
          title,
          content,
          userId: session.user.id,
        })
        if (!response.data?.data) {
          throw new Error("Failed to update post: Backend did not return updated post data.")
        }
        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingPost.id ? { ...post, title, content, updated_at: new Date().toISOString() } : post,
          ),
        )

        setSuccess("Post updated successfully!")
        setEditingPost(null)
      } else {
        setLoading(true)
        const response = await axios.post("/api/posts", {
          userId: session.user.id,
          title,
          content,
        })

        const newPost = response.data?.data
        if (!newPost) {
          throw new Error("Failed to create post: Backend did not return post data.")
        }

        if (!newPost.created_at) {
          newPost.created_at = new Date().toISOString();
        }

        setPosts((prev) => [newPost, ...prev])
        setSuccess("Post created successfully!")
      }

      setTitle("")
      setContent("")
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to submit post:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to submit post.")
    } finally {
      setLoading(false)
      setIsUpdating(false)
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
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content)
    setError("")
    setSuccess("")
  }

  const resetForm = () => {
    setEditingPost(null)
    setTitle("")
    setContent("")
    setError("")
    setSuccess("")
  }

  const handleShare = (post: Post) => {
    setSharePost(post)
  }

  // const formatDate = (dateStr: string) => {
  //   try {
  //     const date = new Date(dateStr);
  //     return date instanceof Date && !isNaN(date.getTime())
  //       ? date.toLocaleDateString()
  //       : "Just now";
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //     return "Just now";
  //   }
  // }

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
      <div className="flex-1 container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0">
        {session && <UserPanel user={session.user} />}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">My Posts</h1>
          <Button variant="outline" className="mt-2 md:mt-0" onClick={() => router.push("/allpost")}>
            View All Posts
          </Button>
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading || isUpdating}
              />
              <Textarea
                placeholder="Write your post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[100px]"
                disabled={loading || isUpdating}
              />
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={loading || isUpdating} className="relative">
                  {!editingPost && <PlusCircle className="mr-2 h-4 w-4" />}
                  {(loading || isUpdating) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Creating..." : isUpdating ? "Updating..." : editingPost ? "Update Post" : "Create Post"}
                </Button>
                {editingPost && (
                  <Button type="button" variant="outline" onClick={resetForm} disabled={loading || isUpdating}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

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