import { NextResponse } from "next/server"
import prisma from "@/lib/db" // Assuming you have a prisma client setup

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const postId = params.id

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 })
  }
}

