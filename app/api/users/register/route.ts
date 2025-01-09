import { NextRequest, NextResponse } from 'next/server';
import { fetchUsers } from '@/app/lib/users';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const users = await fetchUsers();
  
  if (users.some(u => u.email === email)) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, 
  };
  
  users.push(newUser);
  
  return NextResponse.json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
}

