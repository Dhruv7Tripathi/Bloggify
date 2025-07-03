"use client"
import { useEffect, useState } from "react"
import { Loader2, Share2, Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import SharePostDialog from "@/components/(secondary)/share-post-dialog"
import UserPanel from "@/components/(secondary)/user-panel"

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
  const [isUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [sharePost, setSharePost] = useState<Post | null>(null)
  // const [sidebarOpen, setSidebarOpen] = useState(false)

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
    <div className="min-h-screen bg-background" style={{ marginRight: "250px" }}>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">My Posts</h1>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <NavigationSidebar />
            </SheetContent>
          </Sheet>
        </div> */}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        {/* <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:border-r">
          <NavigationSidebar />
        </div> */}

        {/* Main Content */}
        <div className="flex-1 mt-24 lg:ml-64">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* User Panel */}
            {session && (
              <div className="mb-6">
                <UserPanel user={session.user} />
              </div>
            )}

            {/* Header - Desktop */}
            <div className="hidden lg:flex lg:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Posts</h1>
              <div className="flex gap-2">
                <Button variant="default" onClick={() => router.push("/write")}>
                  <Pen className="w-4 h-4 mr-2" />
                  Write
                </Button>
                <Button variant="outline" onClick={() => router.push("/allpost")}>
                  View All Posts
                </Button>
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="default" onClick={() => router.push("/write")} className="flex-1 sm:flex-none">
                  <Pen className="w-4 h-4 mr-2" />
                  Write New Post
                </Button>
                <Button variant="outline" onClick={() => router.push("/allpost")} className="flex-1 sm:flex-none">
                  View All Posts
                </Button>
              </div>
            </div>

            {/* Alerts */}
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

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No posts available. Create your first one!</p>
                <Button onClick={() => router.push("/write")}>
                  <Pen className="w-4 h-4 mr-2" />
                  Write Your First Post
                </Button>
              </div>
            ) : (
              /* Posts Grid */
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="w-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg sm:text-xl line-clamp-2 leading-tight">{post.title}</CardTitle>
                      {/* Uncomment if you want to show date */}
                      {/* <p className="text-sm text-muted-foreground">{formatDate(post.created_at)}</p> */}
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm sm:text-base whitespace-pre-wrap line-clamp-3 sm:line-clamp-4 text-muted-foreground">
                        {post.content}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-3 border-t">
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <div className="flex gap-2 flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            disabled={loading || isUpdating}
                            className="flex-1 sm:flex-none"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            disabled={loading || isUpdating}
                            className="flex-1 sm:flex-none"
                          >
                            Delete
                          </Button>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleShare(post)}
                          disabled={loading || isUpdating}
                          className="w-full sm:w-auto"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Share Dialog */}
            {sharePost && <SharePostDialog post={sharePost} isOpen={!!sharePost} onClose={() => setSharePost(null)} />}
          </div>
        </div>
      </div>
    </div>
  )
}
