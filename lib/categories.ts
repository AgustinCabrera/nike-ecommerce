export const fetchCategories = async () => {
  const response = await fetch('http://localhost:3001/categories'); 
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.categories; 
};
