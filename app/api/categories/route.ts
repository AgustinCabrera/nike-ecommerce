import { NextApiRequest, NextApiResponse } from "next";
import { isAdmin } from "@/app/lib/authorize";
import { fetchCategories } from "@/app/lib/categories";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({message: 'Error fetching categories', error: error.message}, {status: 500});
  }
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