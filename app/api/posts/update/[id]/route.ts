// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/db";

// interface Params {
//   params: Promise<{ id: string }>
// }


// export async function PUT(request: NextRequest, { params }: Params) {
//   const { id } = await params;
//   const { title, content } = await request.json();
//   if (!id) {
//     return NextResponse.json(
//       { success: false, message: "ID is missing in the request params" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedPost = await prisma.post.update({
//       where: { id },
//       data: { title, content },
//     });

//     return NextResponse.json(updatedPost);
//   } catch (error) {
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/db";

// interface Params {
//   params: { id: string }
// }

// export async function PUT(request: NextRequest, { params }: Params) {
//   const id = params.id;

//   if (!id) {
//     return NextResponse.json(
//       { success: false, message: "ID is missing in the request params" },
//       { status: 400 }
//     );
//   }

//   try {
//     const { title, content } = await request.json();

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

//     return NextResponse.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Unknown error occurred"
//     }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the ID from params - with proper await since it's a promise
  const { id } = await Promise.resolve(params);

  try {
    const { title, content, userId } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is missing in the request params" },
        { status: 400 }
      );
    }

    // First check if the post exists
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