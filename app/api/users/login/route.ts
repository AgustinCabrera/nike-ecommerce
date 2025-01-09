import { NextRequest, NextResponse } from 'next/server';
import { fetchUsers } from '@/app/lib/users';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const users = await fetchUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}

