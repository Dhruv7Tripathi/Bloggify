import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Global Prisma client instance to avoid creating multiple instances in serverless functions
interface GlobalPrisma {
  prisma?: PrismaClient;
}

interface Params {
  params: Promise<{ id: string }>
}

declare const global: GlobalPrisma;

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function PUT(request: NextRequest, { params }: Params) {
  const id = (await params).id;
  const { title, content } = await request.json();

  try {
    // Update the post in the database
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = (await params).id; // Destructure params correctly

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is missing in the request params' },
        { status: 400 }
      );
    }

    const deletedPost = await prisma.post.delete({
      where: { id },
    });

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}