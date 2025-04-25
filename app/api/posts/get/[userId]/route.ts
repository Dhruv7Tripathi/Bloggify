import { NextResponse } from "next/server"
import db from "@/lib/db"
import { authOptions } from "@/lib/authoptions"
import { getServerSession } from "next-auth"

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { userId } = await params;
    if (userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized: You can only view your own posts" }, { status: 403 })
    }

    const posts = await db.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}
