import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omnichannel Retail Accelerator",
  description: "Presales demo for unified commerce experiences",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <DemoProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
