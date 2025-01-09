import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUsers } from '../lib/users';

const users = await fetchUsers();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

    if(role && role != 'user' && role != 'admin'){
      return res.status(400).json({ message: 'Invalid role' });
    }
    const userRole = role || 'user';
    
    const userExists = users.some((user: { email: string }) => user.email === email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { 
      id: users.length + 1, 
      name, 
      email, 
      password , 
      rol:userRole
    };
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
