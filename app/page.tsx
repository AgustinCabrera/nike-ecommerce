import Image from "next/image";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className = "logo">
        <Image src="/nike.png" alt="medias" width={400} height={300}></Image>
        </div>
        <h1 className="text-4xl font-bold">Welcome to Nike ecommerce</h1>
        <h1 className="text-2xl font-bold">oficial crombie partner</h1>
        
      </main>
    </div>
  );
}
