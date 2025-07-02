// import { type NextRequest, NextResponse } from "next/server"
// import prisma from "@/lib/db"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/authoptions"

// // interface Params {
// //   params: Promise<{ id: string }>
// // }

// export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session || !session.user?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const { id: postId } = await params
//     const body = await request.json()
//     const { type } = body // 'LIKE' or 'DISLIKE'

//     if (!type || !["LIKE", "DISLIKE"].includes(type)) {
//       return NextResponse.json({ message: "Invalid like type" }, { status: 400 })
//     }

//     // Check if post exists
//     const post = await prisma.post.findUnique({
//       where: { id: postId },
//     })

//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 })
//     }

//     // Check if user already liked/disliked this post
//     const existingLike = await prisma.like.findUnique({
//       where: {
//         userId_postId: {
//           userId: session.user.id,
//           postId: postId,
//         },
//       },
//     })

//     if (existingLike) {
//       if (existingLike.type === type) {
//         // Remove like/dislike if same type
//         await prisma.like.delete({
//           where: { id: existingLike.id },
//         })
//       } else {
//         // Update like type if different
//         await prisma.like.update({
//           where: { id: existingLike.id },
//           data: { type },
//         })
//       }
//     } else {
//       // Create new like/dislike
//       await prisma.like.create({
//         data: {
//           userId: session.user.id,
//           postId: postId,
//           type,
//         },
//       })
//     }

//     // Get updated counts
//     const [likesCount, dislikesCount] = await Promise.all([
//       prisma.like.count({
//         where: { postId, type: "Like" },
//       }),
//       prisma.like.count({
//         where: { postId, type: "Dislike" },
//       }),
//     ])

//     // Get user's current reaction
//     const userReaction = await prisma.like.findUnique({
//       where: {
//         userId_postId: {
//           userId: session.user.id,
//           postId: postId,
//         },
//       },
//     })

//     return NextResponse.json({
//       likesCount,
//       dislikesCount,
//       userReaction: userReaction?.type || null,
//     })
//   } catch (error) {
//     console.error("Error handling like:", error)
//     return NextResponse.json({ message: "Failed to process like" }, { status: 500 })
//   }
// }

// export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions)
//     const { id: postId } = await params

//     const [likesCount, dislikesCount] = await Promise.all([
//       prisma.like.count({
//         where: { postId, type: "Like" },
//       }),
//       prisma.like.count({
//         where: { postId, type: "Dislike" },
//       }),
//     ])

//     let userReaction = null
//     if (session?.user?.id) {
//       const userLike = await prisma.like.findUnique({
//         where: {
//           userId_postId: {
//             userId: session.user.id,
//             postId: postId,
//           },
//         },
//       })
//       userReaction = userLike?.type || null
//     }

//     return NextResponse.json({
//       likesCount,
//       dislikesCount,
//       userReaction,
//     })
//   } catch (error) {
//     console.error("Error fetching likes:", error)
//     return NextResponse.json({ message: "Failed to fetch likes" }, { status: 500 })
//   }
// }
import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"

const prisma = new PrismaClient()

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id: postId } = await params
    const body = await request.json()
    const { type } = body // 'LIKE' or 'DISLIKE'

    if (!type || !["LIKE", "DISLIKE"].includes(type)) {
      return NextResponse.json({ message: "Invalid like type" }, { status: 400 })
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Check if user already liked/disliked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    })

    if (existingLike) {
      if (existingLike.type === type) {
        // Remove like/dislike if same type
        await prisma.like.delete({
          where: { id: existingLike.id },
        })
      } else {
        // Update like type if different
        await prisma.like.update({
          where: { id: existingLike.id },
          data: { type },
        })
      }
    } else {
      // Create new like/dislike
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId: postId,
          type,
        },
      })
    }

    // Get updated counts
    const [likesCount, dislikesCount] = await Promise.all([
      prisma.like.count({
        where: { postId, type: "Like" },
      }),
      prisma.like.count({
        where: { postId, type: "Dislike" },
      }),
    ])

    // Get user's current reaction
    const userReaction = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    })

    return NextResponse.json({
      likesCount,
      dislikesCount,
      userReaction: userReaction?.type || null,
    })
  } catch (error) {
    console.error("Error handling like:", error)
    return NextResponse.json({ message: "Failed to process like" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    const { id: postId } = await params

    const [likesCount, dislikesCount] = await Promise.all([
      prisma.like.count({
        where: { postId, type: "Like" },
      }),
      prisma.like.count({
        where: { postId, type: "Dislike" },
      }),
    ])

    let userReaction = null
    if (session?.user?.id) {
      const userLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: postId,
          },
        },
      })
      userReaction = userLike?.type || null
    }

    return NextResponse.json({
      likesCount,
      dislikesCount,
      userReaction,
    })
  } catch (error) {
    console.error("Error fetching likes:", error)
    return NextResponse.json({ message: "Failed to fetch likes" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
