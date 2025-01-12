import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        imgeUrl: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, imgeUrl, stock, category } =
      await req.json();
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imgeUrl,
        stock,
        category: {
          connect: {
            id: category,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imgeUrl: true,
        stock: true,
        category: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
}
