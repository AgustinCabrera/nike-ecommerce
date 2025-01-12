import { NextApiRequest, NextApiResponse } from 'next';

const mockUsers = [
  { id: 1, email: 'admin@example.com', role: 'admin' },
  { id: 2, email: 'user@example.com', role: 'user' },
];

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body; 

  // Find user by email from the mock database
  const user = mockUsers.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  return user; 
};
