import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import AuthLayout from "../components/AuthLayout.tsx";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: "Employee-mgmt",
  description: "app for manageing employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
      <AuthLayout>
        <Analytics/>
        <main>
          <Header/>  
          {children}
        </main>
      </AuthLayout>
      </body>
    </html>
  );
}
