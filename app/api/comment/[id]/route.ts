import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}