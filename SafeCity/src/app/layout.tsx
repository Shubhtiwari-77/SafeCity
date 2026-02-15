import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeCity - Smart Driver Safety",
  description: "AI Driver Behavior Monitoring & Emergency Response",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
        <div className="flex bg-gray-50 min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
            <TopBar />
           
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 pt-0">
              {children}
            </main>
          </div>
        </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
