"use client"

import { useEffect, useState } from "react"
import { Loader2, Search, ArrowLeft, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import SharePostDialog from "@/components/share-post-dialog"

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

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sharePost, setSharePost] = useState<Post | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    fetchAllPosts()
  }, [])

  const fetchAllPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/posts/all")
      if (response.data) {
        setPosts(response.data)
      } else {
        setPosts([])
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error("Failed to fetch posts:", axiosError.response?.data || axiosError.message)
      setError(axiosError.response?.data?.message || "Failed to fetch posts. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = (post: Post) => {
    setSharePost(post)
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">All Posts</h1>
        </div>

        <div className="w-full md:w-auto relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{searchTerm ? "No posts match your search." : "No posts available."}</p>
          {searchTerm && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user?.image || ""} alt={post.user?.name || "User"} />
                    <AvatarFallback>{getInitials(post.user?.name, post.user?.email)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{post.user?.name || post.user?.email || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap line-clamp-4">{post.content}</p>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button variant="secondary" size="sm" onClick={() => handleShare(post)} className="ml-auto">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Share Post Dialog */}
      {sharePost && <SharePostDialog post={sharePost} isOpen={!!sharePost} onClose={() => setSharePost(null)} />}
    </div>
  )
}

