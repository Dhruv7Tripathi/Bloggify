import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>
}


export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { title, content } = await request.json();
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is missing in the request params" },
      { status: 400 }
    );
  }
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
