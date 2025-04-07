import "./globals.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nicole's Portfolio",
  description: "A personal portfolio built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-y-auto no-scrollbar">
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
