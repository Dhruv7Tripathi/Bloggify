import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, title, content } = await request.json();

    if (!userId || !title || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: userId, title, or content" },
        { status: 400 }
      );
    }
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: `User with id ${userId} does not exist` },
        { status: 404 }
      );
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
      include: {
        user: true, // Include user data in the response
      },
    });

    return NextResponse.json(
      { success: true, data: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error)
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