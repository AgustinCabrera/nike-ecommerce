import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Link from "next/link";
import Footer from "../lib/footer";
import { SignOut } from "@/app/components/Auth/Singout";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nike E-commerce",
  description: "Official Nike E-commerce Store - Crombie Partner",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <nav className=" shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link href="/" className="flex-shrink-0 flex items-center">
                    <Image src="/nike.png" alt="Nike logo" width={60} height={45} />
                  </Link>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link href="/categories/women" className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                      Women
                    </Link>
                    <Link href="/categories/men" className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                      Men
                    </Link>
                    <Link href="/categories/children" className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                      Kids
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {session ? (
                    <SignOut />
                  ) : (
                    <Link href="/api/auth/signin" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <div className="flex-grow">{children}</div>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}

