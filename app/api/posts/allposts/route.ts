import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include
        : {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server error" + error }, { status: 500 });
  }
}