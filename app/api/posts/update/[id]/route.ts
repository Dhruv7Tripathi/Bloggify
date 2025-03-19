import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await Promise.resolve(params);

  try {
    const { title, content } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is missing in the request params" },
        { status: 400 }
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json({
        success: false,
        message: "Post not found"
      }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost
    });
  } catch (error) {
    console.error("Error updating post:", error);

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/db";

// interface RouteContext {
//   params: { id: string };
// }

// export async function PUT(req: NextRequest, { params }: RouteContext) {
//   const { id } = params; // Access `id` directly

//   try {
//     const { title, content } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "ID is missing in the request params" },
//         { status: 400 }
//       );
//     }

//     const existingPost = await prisma.post.findUnique({
//       where: { id }
//     });

//     if (!existingPost) {
//       return NextResponse.json(
//         { success: false, message: "Post not found" },
//         { status: 404 }
//       );
//     }

//     const updatedPost = await prisma.post.update({
//       where: { id },
//       data: { title, content },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Post updated successfully",
//       data: updatedPost
//     });
//   } catch (error) {
//     console.error("Error updating post:", error);

//     return NextResponse.json(
//       { success: false, message: error instanceof Error ? error.message : "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }
