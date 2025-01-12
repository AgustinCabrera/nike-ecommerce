import prisma from "@/lib/prisma";
import { hash } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: "NextRequest") {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Invalid request method", error: "Method not allowed" },
      { status: 405 }
    );
  }
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Invalid request body", error: "Bad request" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({where:{email}})
    if(existingUser){
      return NextResponse.json(
        { message: "User already exists", error: "Conflict" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password,10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
