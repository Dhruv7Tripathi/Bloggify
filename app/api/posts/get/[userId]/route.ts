// import prisma from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     if (!id) {
//       return NextResponse.json({ success: false, message: "Post ID is missing" }, { status: 400 });
//     }

//     const post = await prisma.post.findMany({
//       where: { id },
//       include: { user: true },
//     });

//     if (!post) {
//       return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json(post, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server"
import db from "@/lib/db"
import { authOptions } from "@/lib/authoptions"
import { getServerSession } from "next-auth"

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { userId } = params

    // Verify that the requested user ID matches the authenticated user
    // or implement additional permission checks for admin users
    if (userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized: You can only view your own posts" }, { status: 403 })
    }

    // Fetch posts for the user
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


