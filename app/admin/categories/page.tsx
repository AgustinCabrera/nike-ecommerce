'use client';
import { useState, useEffect } from 'react';
import { fetchCategories } from '@/app/lib/categories';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    });

    if (response.ok) {
      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New category name"
        />
        <button onClick={handleAddCategory} className="bg-green-500 text-white p-2 rounded">
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2">
            {category.name}
            <button onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

