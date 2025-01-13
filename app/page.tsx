import Image from "next/image";
import CategoryCard from "@/app/components/category-card";
import prisma from "@/lib/prisma";
async function getCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return categories;
}
export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="logo">
          <Image src="/nike.png" alt="medias" width={1200} height={1200}></Image>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              imgeUrl={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(
                category.name
              )}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
