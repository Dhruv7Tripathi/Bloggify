"use client"
import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import axios from "axios"

interface LikeDislikeProps {
  postId: string
  initialLikesCount?: number
  initialDislikesCount?: number
  initialUserReaction?: "LIKE" | "DISLIKE" | null
}

export default function LikeDislike({
  postId,
  initialLikesCount = 0,
  initialDislikesCount = 0,
  initialUserReaction = null,
}: LikeDislikeProps) {
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [dislikesCount, setDislikesCount] = useState(initialDislikesCount)
  const [userReaction, setUserReaction] = useState<"LIKE" | "DISLIKE" | null>(initialUserReaction)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    fetchLikes()
  }, [postId])

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}/like`)
      setLikesCount(response.data.likesCount)
      setDislikesCount(response.data.dislikesCount)
      setUserReaction(response.data.userReaction)
    } catch (error) {
      console.error("Failed to fetch likes:", error)
    }
  }

  const handleReaction = async (type: "LIKE" | "DISLIKE") => {
    if (!session) return

    try {
      setLoading(true)
      const response = await axios.post(`/api/posts/${postId}/like`, { type })
      setLikesCount(response.data.likesCount)
      setDislikesCount(response.data.dislikesCount)
      setUserReaction(response.data.userReaction)
    } catch (error) {
      console.error("Failed to update reaction:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikesCount}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={userReaction === "LIKE" ? "default" : "outline"}
        size="sm"
        onClick={() => handleReaction("LIKE")}
        disabled={loading}
        className="flex items-center gap-1"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsUp className="w-4 h-4" />}
        <span>{likesCount}</span>
      </Button>

      <Button
        variant={userReaction === "DISLIKE" ? "destructive" : "outline"}
        size="sm"
        onClick={() => handleReaction("DISLIKE")}
        disabled={loading}
        className="flex items-center gap-1"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsDown className="w-4 h-4" />}
        <span>{dislikesCount}</span>
      </Button>
    </div>
  )
}
