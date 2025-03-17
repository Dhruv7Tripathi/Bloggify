import { NextResponse } from "next/server"
import prisma from "@/lib/db" // Assuming you have a prisma client setup

export async function GET() {
  try {
    // Fetch all posts with user information
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching all posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

