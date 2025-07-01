"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import MediumEditor from "@/components/(secondary)/texteditor"
import axios from "axios"

interface Post {
  id: string
  title: string
  content: string
}

export default function WritePage() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated" && editId) {
      fetchPost(editId)
    }
  }, [status, router, editId])

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/posts/${postId}`)
      setPost(response.data)
    } catch (error) {
      console.error("Failed to fetch post:", error)
      router.push("/write")
    } finally {
      setLoading(false)
    }
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
    <MediumEditor
      initialTitle={post?.title || ""}
      initialContent={post?.content || ""}
      postId={post?.id}
      onSave={() => router.push("/")}
    />
  )
}
