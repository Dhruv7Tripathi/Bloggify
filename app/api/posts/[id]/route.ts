import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Global Prisma client instance to avoid creating multiple instances in serverless functions
interface GlobalPrisma {
  prisma?: PrismaClient;
}

declare const global: GlobalPrisma;

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();

  try {
    // Update the post in the database
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
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
