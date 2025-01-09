import { isAdmin } from "@/app/lib/authorize";
import { fetchUsers } from "@/app/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params:{}}){
  const users = await fetchUsers();
  const { id } = req.params;
  const response = users.find((user) => user.id === parseInt(id));
  if (!response) {
    return NextResponse.json(
      { message: `User with id: ${id} not found` },
      { status: 404 }
    );
  }
  return NextResponse.json(response);
}
export async function DELETE(req:NextRequest,{params:{}}){
  const role = isAdmin(req,NextResponse);
  if (!role) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    );
  }
  const users = await fetchUsers();
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json(
      { message: `User with id: ${id} not found` },
      { status: 404 }
    );
  }
  users.splice(index, 1);
  return NextResponse.json({
    message: `User with id: ${id} deleted successfully`,
    status: 200,
  });
}