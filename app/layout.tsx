import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Link from "next/link";
import Footer from "../lib/footer";
import { SignOut } from "@/app/components/Auth/Singout";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col `}
        >
          <div className="navbar">
            <ul>
              <Link href="/">Home</Link>
            </ul>
            <ul>
              <Link href="/categories/women">Women</Link>
            </ul>
            <ul>
              <Link href="/categories/men">Men</Link>
            </ul>
            <ul>
              <Link href="/categories/children">Kids</Link>
            </ul>
            <ul>
              <Link href="/user">User</Link>
            </ul>
            {session ? <SignOut /> : <Link href="/pages/login">Login</Link>}
          </div>
          <div className="flex-grow">{children}</div>
          <footer>
            <Footer></Footer>
          </footer>
        </body>
      </SessionProvider>
    </html>
  );
}
