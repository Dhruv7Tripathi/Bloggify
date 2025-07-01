"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { MessageCircle, Trash2, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import axios from "axios"

interface Comment {
  id: string
  content: string
  created_at: string
  user: {
    id: string
    name?: string
    email?: string
    image?: string
  }
}

interface CommentsProps {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/posts/${postId}/comments`)
      setComments(response.data)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      setError("Failed to load comments")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session || !newComment.trim()) return

    try {
      setSubmitting(true)
      setError("")
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        content: newComment.trim(),
        title: "Comment",
      })

      setComments([response.data.data, ...comments])
      setNewComment("")
    } catch (error: any) {
      console.error("Failed to create comment:", error)
      setError(error.response?.data?.message || "Failed to create comment")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      await axios.delete(`/api/comments/${commentId}`)
      setComments(comments.filter((comment) => comment.id !== commentId))
    } catch (error: any) {
      console.error("Failed to delete comment:", error)
      setError(error.response?.data?.message || "Failed to delete comment")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {session && (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
              disabled={submitting}
            />
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        )}

        {!session && <p className="text-muted-foreground text-center py-4">Please sign in to leave a comment.</p>}

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.user.image || ""} alt={comment.user.name || ""} />
                  <AvatarFallback>
                    {comment.user.name?.charAt(0) || comment.user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.name || comment.user.email}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                    </div>
                    {session?.user?.id === comment.user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
