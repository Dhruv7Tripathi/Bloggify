"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Bold, Italic, Link, ImageIcon, List, Quote } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"

interface MediumEditorProps {
  initialTitle?: string
  initialContent?: string
  postId?: string
  onSave?: () => void
}

export default function MediumEditor({ initialTitle = "", initialContent = "", postId, onSave }: MediumEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [, setSelectedText] = useState("")
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 })
  const [isDraft, setIsDraft] = useState(true)
  const [postIdState, setPostIdState] = useState(postId)
  const contentRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (initialTitle || initialContent) {
      setTitle(initialTitle)
      setContent(initialContent)
      setIsDraft(false)
    }
  }, [initialTitle, initialContent])

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (title.trim() || content.trim()) {
        saveDraft()
      }
    }, 2000)

    return () => clearTimeout(autoSave)
  }, [title, content])

  const saveDraft = async () => {
    if (!session?.user?.id || (!title.trim() && !content.trim())) return;

    try {
      const payload = {
        title: title || "Untitled",
        content: content || "",
        userId: session.user.id,
        isDraft: true,
      };

      if (postIdState) {
        await axios.put(`/api/posts/update/${postIdState}`, payload);
      } else {
        const response = await axios.post("/api/posts", payload);
        if (response.data?.data?.id) {
          const newId = response.data.data.id
          setPostIdState(newId)
          // router.replace(`?edit=${newId}`)
        }
      }
    } catch (error) {
      console.error("Auto-save failed:", error)
    }
  }

  const handlePublish = async () => {
    if (!session?.user?.id) return;
    if (!title.trim() || !content.trim()) {
      alert("Please add both title and content before publishing");
      return;
    }

    try {
      setIsPublishing(true);

      const payload = {
        title: title.trim(),
        content: content.trim(),
        userId: session.user.id,
        isDraft: false,
      };

      if (postIdState) {
        await axios.put(`/api/posts/update/${postIdState}`, payload);
      } else {
        const response = await axios.post("/api/posts", payload);
        if (response.data?.data?.id) {
          setPostIdState(response.data.data.id);
        }
        router.push('/blog');
      }

      setIsDraft(false);
      onSave?.();
      router.push("/blog");
    } catch (error) {
      console.error("Failed to publish:", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      setSelectedText(selection.toString())
      setToolbarPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 50,
      })
      setShowToolbar(true)
    } else {
      setShowToolbar(false)
    }
  }

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    setShowToolbar(false)
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key for new paragraphs
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      document.execCommand("insertHTML", false, "<br><br>")
    }
  }

  return (
    <div className="min-h-screen bg-black ">
      {/* Header */}
      <div className="sticky top-0 bg-black border-b border-gray-800 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Bloggify</h1>
            <span className="text-sm text-gray-50">
              {isDraft ? "Draft" : "Published"} in {session?.user?.name || "Your Blog"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handlePublish}
              disabled={isPublishing || !title.trim() || !content.trim()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-4xl md:text-5xl font-bold border-none outline-none shadow-none p-0 mb-8 placeholder:text-gray-300 bg-transparent"
          style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
        />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <Plus className="w-6 h-6" />
          </div>

          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleContentChange}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            onKeyDown={handleKeyDown}
            className="min-h-[400px] text-lg leading-relaxed outline-none prose prose-lg max-w-none"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.75",
              color: "text-white",
            }}
          // dangerouslySetInnerHTML={{ __html: content }}
          // data-placeholder="Tell your story..."
          />

          {!content && (
            <div
              className="absolute top-12 left-0 text-gray-400 text-lg pointer-events-none"
              style={{ fontSize: "1.125rem" }}
            >
              Tell your story...
            </div>
          )}
        </div>

        {showToolbar && (
          <div
            className="fixed bg-gray-900 text-white rounded-lg shadow-lg px-2 py-1 flex items-center gap-1 z-20"
            style={{
              left: toolbarPosition.x - 100,
              top: toolbarPosition.y,
              transform: "translateX(-50%)",
            }}
          >
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => applyFormat("bold")}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => applyFormat("italic")}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => {
                const url = prompt("Enter URL:")
                if (url) applyFormat("createLink", url)
              }}
            >
              <Link className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => applyFormat("insertUnorderedList")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => applyFormat("formatBlock", "blockquote")}
            >
              <Quote className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700 p-1 h-8 w-8"
              onClick={() => applyFormat("insertImage")}
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        [contenteditable] {
          outline: none;
        }
        
        [contenteditable] p {
          margin: 1rem 0;
        }
        
        [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 2rem;
          margin: 1rem 0;
        }
        
        [contenteditable] li {
          margin: 0.5rem 0;
        }
        
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
