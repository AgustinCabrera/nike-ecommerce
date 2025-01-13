import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';

async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });

  if (!category) {
    notFound();
  }

  return category;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <Image src={product.imgeUrl} alt={product.name} className="w-full h-48 object-cover mb-2" width={40} height={40} />
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

