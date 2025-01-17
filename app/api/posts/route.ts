import { NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server error" + error }, { status: 500 });
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