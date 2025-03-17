"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Twitter, Linkedin, Mail, Copy, Check } from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
}

interface SharePostDialogProps {
  post: Post
  isOpen: boolean
  onClose: () => void
}

export default function SharePostDialog({ post, isOpen, onClose }: SharePostDialogProps) {
  const [copied, setCopied] = useState(false)

  // For demo purposes - in a real app, this would be the actual post URL
  const postUrl = `${window.location.origin}/post/${post.id}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(post.title)
    const body = encodeURIComponent(`Check out this post: ${post.title}\n\n${postUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareToSocial = (platform: string) => {
    let url = ""
    const text = encodeURIComponent(`Check out this post: ${post.title}`)

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(postUrl)}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Copy Link</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="py-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input value={postUrl} readOnly className="h-9" />
              </div>
              <Button size="sm" className="px-3" onClick={handleCopyLink} variant="secondary">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="social" className="py-4">
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => shareToSocial("facebook")}>
                <Facebook className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-xs">Facebook</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => shareToSocial("twitter")}>
                <Twitter className="h-6 w-6 text-blue-400" />
                <span className="mt-2 text-xs">Twitter</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => shareToSocial("linkedin")}>
                <Linkedin className="h-6 w-6 text-blue-700" />
                <span className="mt-2 text-xs">LinkedIn</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4" onClick={shareViaEmail}>
                <Mail className="h-6 w-6 text-gray-600" />
                <span className="mt-2 text-xs">Email</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start">
          <div className="w-full text-xs text-muted-foreground">
            Sharing: <span className="font-medium text-foreground">{post.title}</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

