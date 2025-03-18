import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, message: "Post ID is missing" }, { status: 400 });
    }

    const post = await prisma.post.findMany({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
