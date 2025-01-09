export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3001/users'); 
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data.users; 
};
