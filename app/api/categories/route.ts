import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching categories", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, products } = await req.json();
    const newCategories = await prisma.category.create({
      data: {
        name,
        products: {
          create: req.body.products,
        },
        select: {
          id: true,
          name: true,
          products: true,
        },
      },
    });
    return NextResponse.json(newCategories);
  } catch (error) {
    return NextResponse.json({ message: "Error creating categories", error: error.message }, { status: 500 });
  }
}
