import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: number;
  name: string;
  imgeUrl: string;
}

export default function CategoryCard({ id, name, imgeUrl }: CategoryCardProps){
  return(
    <Link href={`/categories/${id}`} className="group">
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
      <Image
        src={imgeUrl}
        alt={name}
        width={300}
        height={200}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">{name}</h3>
      </div>
    </div>
  </Link>
  )
}

