import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();


export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // Create a new post
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
    // Fetch all posts ordered by `createdAt` in descending order
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
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete the post from the database
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
