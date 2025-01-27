// import prisma from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const reqBody = await req.json();
    const { userId, title, content } = reqBody;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing `userId`" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing `title`" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing `content`" },
        { status: 400 }
      );
    }

    // Create the post in the database
    const post = await prisma.post.create({
      data: {
        content,
        title,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Post added successfully", data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error: " + (error instanceof Error ? error.message : "Unknown error"),
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