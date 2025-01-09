import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUsers } from '../../../lib/users';

const users = await fetchUsers();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find((user: { email: string }) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}