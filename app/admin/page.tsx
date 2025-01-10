'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      alert('Acces denied, admins only')
      router.push('/');
    } else {
      setUserRole(user.role);
    }
  }, [router]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/categories" className="p-4 bg-blue-500 text-white rounded">
          Manage Categories
        </Link>
        <Link href="/admin/products" className="p-4 bg-green-500 text-white rounded">
          Manage Products
        </Link>
        <Link href="/admin/users" className="p-4 bg-yellow-500 text-white rounded">
          Manage Users
        </Link>
      </div>
    </div>
  );
}