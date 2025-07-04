"use client"
import Image from "next/image"
import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={800}
        height={600}
        className={className}
        style={style}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        priority={false}
      />
    </div>
  )
}
