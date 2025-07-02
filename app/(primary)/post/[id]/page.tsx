// "use client"
// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Loader2, ArrowLeft, Edit, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import axios, { type AxiosError } from "axios"
// import { useSession } from "next-auth/react"
// import NavigationSidebar from "@/components/(secondary)/sidebar"
// // import UserPanel from "@/components/(secondary)/user-panel"
// import Comments from "@/components/landingpage/Comments"
// interface Post {
//   id: string
//   title: string
//   content: string
//   created_at: string
//   updated_at?: string
//   user: {
//     id: string
//     name?: string
//     email?: string
//     image?: string
//   }
//   _count: {
//     comments: number
//   }
// }

// export default function PostDetail() {
//   const [post, setPost] = useState<Post | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [deleting, setDeleting] = useState(false)
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const params = useParams()
//   const postId = params.id as string

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin")
//     } else if (status === "authenticated" && postId) {
//       fetchPost()
//     }
//   }, [status, router, postId])

//   const fetchPost = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get(`/api/posts/${postId}`)
//       setPost(response.data)
//     } catch (error: unknown) {
//       const axiosError = error as AxiosError<{ message: string }>
//       console.error("Failed to fetch post:", axiosError.response?.data || axiosError.message)
//       setError(axiosError.response?.data?.message || "Failed to fetch post. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async () => {
//     if (!post || !confirm("Are you sure you want to delete this post?")) return

//     try {
//       setDeleting(true)
//       await axios.delete(`/api/posts/delete/${post.id}`)
//       router.push("/")
//     } catch (error: unknown) {
//       const axiosError = error as AxiosError<{ message: string }>
//       console.error("Failed to delete post:", axiosError.response?.data || axiosError.message)
//       setError(axiosError.response?.data?.message || "Failed to delete post. Please try again later.")
//     } finally {
//       setDeleting(false)
//     }
//   }

//   const handleEdit = () => {
//     router.push(`/?edit=${post?.id}`)
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const isOwner = session?.user?.id === post?.user.id

//   if (status === "loading" || loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-6 h-6 animate-spin" />
//       </div>
//     )
//   }

//   if (status === "unauthenticated") {
//     return null
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen">
//         <NavigationSidebar />
//         <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6">
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//           <Button variant="outline" onClick={() => router.back()} className="mt-4">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Go Back
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   if (!post) {
//     return (
//       <div className="flex min-h-screen">
//         <NavigationSidebar />
//         <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6">
//           <p className="text-center text-gray-500">Post not found.</p>
//           <Button variant="outline" onClick={() => router.back()} className="mt-4">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Go Back
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex min-h-screen">
//       <NavigationSidebar />
//       <div className="flex-1 ml-24 mr-16 container mx-auto py-6 md:py-10 px-4 md:px-6 mb-16 md:mb-0">
//         {/* <div className="mb-6 ml-24 pl-24">
//           <Button variant="outline" onClick={() => router.back()}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Button>
//         </div> */}

//         <Card className="max-w-4xl mx-auto">
//           <CardHeader className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Avatar className="w-8 h-8">
//                 <AvatarImage src={post.user.image || ""} alt={post.user.name || ""} />
//                 <AvatarFallback>
//                   {post.user.name?.charAt(0) || post.user.email?.charAt(0) || "U"}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="font-medium">{post.user.name || post.user.email}</span>
//             </div>

//             <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
//               {post.title}
//             </CardTitle>

//             {isOwner && (
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" onClick={handleEdit}>
//                   <Edit className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//                 <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
//                   {deleting ? (
//                     <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                   ) : (
//                     <Trash2 className="w-4 h-4 mr-1" />
//                   )}
//                   Delete
//                 </Button>
//               </div>
//             )}

//             {/* Metadata (e.g. updated time) */}
//             {post.updated_at && post.updated_at !== post.created_at && (
//               <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                 <Separator orientation="vertical" className="h-4" />
//                 <span>Updated {formatDate(post.updated_at)}</span>
//               </div>
//             )}
//           </CardHeader>

//           <CardContent className="prose prose-gray max-w-none">
//             <div className="whitespace-pre-wrap text-base leading-relaxed">
//               {post.content}
//             </div>
//           </CardContent>
//         </Card>

//         <div className="max-w-4xl mx-auto">
//           <Comments postId={post.id} />
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ArrowLeft, Edit, Trash2, Calendar, MessageCircle, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios, { type AxiosError } from "axios"
import { useSession } from "next-auth/react"
// import NavigationSidebar from "@/components/(secondary)/navigation-sidebar"
import Comments from "@/components/landingpage/Comments"
import LikeDislike from "@/components/(secondary)/likedislike"

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
  _count: {
    likes: number
    comments: number
  }
}

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    if (!post) return

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

  const getRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

    return formatDate(dateString)
  }

  const isOwner = session?.user?.id === post?.user.id

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* <NavigationSidebar /> */}
        <div className="lg:ml-16 pb-20 lg:pb-6">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        {/* <NavigationSidebar /> */}
        <div className="lg:ml-16 pb-20 lg:pb-6">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={() => router.back()} className="mt-4" variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        {/* <NavigationSidebar /> */}
        <div className="lg:ml-16 mt-24 pb-20 lg:pb-6">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <Card>
              <CardContent className="pt-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Post not found</h2>
                <p className="text-muted-foreground mb-4">
                  The post you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => router.back()} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <NavigationSidebar /> */}

      {/* Mobile Header */}
      <div className="lg:hidden  sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold truncate">Post Details</h1>
          </div>
          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={deleting}>
                      {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* <NavigationSidebar /> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-16 pb-20 lg:pb-6">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Desktop Back Button */}
          <div className="hidden lg:block mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </div>

          {/* Post Content */}
          <article className="space-y-6">
            {/* Post Header */}
            <Card>
              <CardHeader className="space-y-4">
                {/* Author Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={post.user.image || ""} alt={post.user.name || "User"} />
                      <AvatarFallback className="bg-primary/10">
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{post.user.name || post.user.email}</p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <time dateTime={post.created_at} title={formatDate(post.created_at)}>
                          {getRelativeTime(post.created_at)}
                        </time>
                      </div>
                    </div>
                  </div>

                  {isOwner && (
                    <div className="hidden lg:flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" disabled={deleting}>
                            {deleting ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 mr-2" />
                            )}
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this post? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {post.updated_at && post.updated_at !== post.created_at && (
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        Updated {getRelativeTime(post.updated_at)}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {post?._count?.comments ?? 0}{" "}
                      {(post?._count?.comments ?? 0) === 1 ? "comment" : "comments"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <LikeDislike postId={post.id} />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{post.content}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comments ({post?._count?.comments ?? 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {post?.id ? <Comments postId={post.id} /> : <p>Loading comments...</p>}
              </CardContent>
            </Card>

          </article>
        </div>
      </div>
    </div>
  )
}
