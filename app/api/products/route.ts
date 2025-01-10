import { fetchProducts } from '@/app/lib/products';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany(); 
    return NextResponse.json(products); 
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching products', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const response = await fetchProducts();
    const newProduct = await response.json(); 
    const user = await isAdmin(req,res);
    if(!user){
      return res.status(403).json({message: "Forbidden: Admins only"});
    }
    return NextResponse.json(newProduct, { status: 201 }); 
  } catch (error) {
    return NextResponse.json(
      { message: 'Error adding product', error: error.message },
      { status: 500 }
    );
  }
}
