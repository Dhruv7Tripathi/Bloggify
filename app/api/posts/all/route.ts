import { NextResponse } from "next/server"
import db from "@/lib/db"
import { authOptions } from "@/lib/authoptions"
import { getServerSession } from "next-auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const posts = await db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            comment: true,
            likes: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching all posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

