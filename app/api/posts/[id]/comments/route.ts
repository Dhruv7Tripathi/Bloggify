import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: postId } = params

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ message: "Failed to fetch comments" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id: postId } = params
    const body = await request.json()
    const { content, title } = body

    if (!title || title.trim().length === 0) {
      return NextResponse.json({ message: "Comment title is required" }, { status: 400 })
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ message: "Comment content is required" }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        userId: session.user.id,
        postId: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: "Comment created successfully",
      data: comment,
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ message: "Failed to create comment" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
