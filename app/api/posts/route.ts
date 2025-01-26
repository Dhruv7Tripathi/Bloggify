import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, title, content } = await req.json();

    const post = await prisma.post.create({
      data: {
        content,
        title,
        user: {
          connect: { id: userId },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Failed to add post" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Post added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error: " + (error instanceof Error ? error.message : "Unknown error")
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server error" + error }, { status: 500 });
  }
}