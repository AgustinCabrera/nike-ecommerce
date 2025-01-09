import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from '@/app/lib/products';

export async function GET(req: NextRequest,{params:{}}) {
  const products = await fetchProducts();
  const { id } = params; 
  const response = products.find((product) => product.id === parseInt(id));
  if (!response) {
    return NextResponse.json(
      { message: `Product with id: ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(products);
}

export async function DELETE(req: NextRequest,{params:{}}) {
  const products = await fetchProducts();
  const { id } = params; 

  const index = products.findIndex((product) => product.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json(
      { message: `Product with id: ${id} not found` },
      { status: 404 }
    );
  }

  products.splice(index, 1);

  return NextResponse.json({
    message: `Product with id: ${id} deleted successfully`,
    status: 200,
  });
}
