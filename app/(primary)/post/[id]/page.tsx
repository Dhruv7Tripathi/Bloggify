"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ArrowLeft, Calendar, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios, { type AxiosError } from "axios"
import SharePostDialog from "@/components/(secondary)/share-post-dialog"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  userId: string
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string)
    }
  }, [params.id])

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/posts/${postId}`)
      if (response.data) {
        setPost(response.data)
      } else {
        setError("Post not found")
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to fetch post:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to fetch post. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Get user initials for avatar fallback
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return email?.[0].toUpperCase() || "U"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
        <Alert variant="destructive">
          <AlertDescription>{error || "Post not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Go Back
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user?.image || ""} alt={post.user?.name || "User"} />
              <AvatarFallback>{getInitials(post.user?.name, post.user?.email)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.user?.name || post.user?.email || "Anonymous"}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => setShareDialogOpen(true)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Post
          </Button>
        </CardFooter>
      </Card>

      {/* Share Post Dialog */}
      {post && <SharePostDialog post={post} isOpen={shareDialogOpen} onClose={() => setShareDialogOpen(false)} />}
    </div>
  )
}

