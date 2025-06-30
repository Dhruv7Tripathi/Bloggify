"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Loader2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SharePostDialog from "@/components/(secondary)/share-post-dialog"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NavigationSidebar from "@/components/(secondary)/sidebar"

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
  const [sharePost, setSharePost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating] = useState(false)
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

      const validatedPosts = response.data.map((post: Post) => {
        if (!post.created_at) {
          post.created_at = new Date().toISOString();
        }
        return post;
      });

      setPosts(validatedPosts)
    } catch (error) {
      console.error("Failed to fetch all posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleShare = (post: Post) => {
    setSharePost(post)
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">All Posts</h1>

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
                      {/* <p className="text-xs text-muted-foreground">{formatDate(post.created_at)}</p> */}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  {/* <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDate(post.created_at)}
                  </div> */}
                  <Button
                    variant="secondary"
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