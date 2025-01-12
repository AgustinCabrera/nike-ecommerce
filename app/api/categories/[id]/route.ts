import { fetchCategories } from "@/lib/categories";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/authorize";

export async function GET(req: NextRequest,{params:{params}}) {
  const categories = await fetchCategories();
  const { id } = params;
  const response = categories.find((category) => category.id === parseInt(id));
  if (!response) {
    return NextResponse.json(
      { message: `Category with id: ${id} not found` },
      { status: 404 }
    );
  }
  return NextResponse.json(response);
}
export async function DELETE(req: NextRequest,{params:{params}}) {
  const categories = await fetchCategories();
  const { id } = params;
  const index = categories.findIndex((category) => category.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json(
      { message: `Category with id: ${id} not found` },
      { status: 404 }
    );
  }
  categories.splice(index, 1);
  return NextResponse.json({
    message: `Category with id: ${id} deleted successfully`,
    status: 200,
  });
}
export async function POST(req: NextApiRequest, res: NextApiResponse){
  try {
    const user = await isAdmin(req,res);
    if(!user){
      return res.status(403).json({message: "Forbidden: Admins only"});
    }
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return res.status(500).json({message: "Error adding category", error: error.message});
  }
}
