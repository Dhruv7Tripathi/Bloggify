"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ArrowLeft, Calendar, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import NavigationSidebar from "@/components/(secondary)/sidebar"
// import UserPanel from "@/components/(secondary)/user-panel"
import LikeDislike from "@/components/(secondary)/likedislike"
import Comments from "@/components/(secondary)/Comments"

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
    likes: number
    comments: number
  }
}

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated" && postId) {
      fetchPost()
    }
  }, [status, router, postId])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/posts/${postId}`)
      setPost(response.data)
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to fetch post:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to fetch post. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm("Are you sure you want to delete this post?")) return

    try {
      setDeleting(true)
      await axios.delete(`/api/posts/delete/${post.id}`)
      router.push("/")
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to delete post:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to delete post. Please try again later.")
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = () => {
    router.push(`/write?edit=${post?.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOwner = session?.user?.id === post?.user.id

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

  if (error) {
    return (
      <div className="flex min-h-screen">
        <NavigationSidebar />
        <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen">
        <NavigationSidebar />
        <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6">
          <p className="text-center text-gray-500">Post not found.</p>
          <Button variant="outline" onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0" style={{ marginTop: "6rem", marginRight: "6rem" }}>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.user.image || ""} alt={post.user.name || ""} />
                  <AvatarFallback>{post.user.name?.charAt(0) || post.user.email?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.user.name || post.user.email}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Published {formatDate(post.created_at)}</span>
                </div>
                {post.updated_at && post.updated_at !== post.created_at && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Updated {formatDate(post.updated_at)}</span>
                  </>
                )}
              </div>
            </div>

            <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
              {post.title}
            </CardTitle>
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{post._count?.likes || 0} Likes</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="font-medium">{post._count?.comments || 0} Comments</span>
            </div> */}
            {isOwner && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                  {deleting ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-1" />
                  )}
                  Delete
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="text-gray-800 max-w-none">
            <div
              className="leading-relaxed text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
              }}
            />
            <div className="flex items-center text-white justify-between pt-4">
              <LikeDislike postId={post.id} />
            </div>
          </CardContent>
        </Card>


        <div className="max-w-4xl mx-auto">
          <Comments postId={post.id} />
        </div>
      </div>

    </div>
  )
}
