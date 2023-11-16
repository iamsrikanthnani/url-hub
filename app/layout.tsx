"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="iris" panelBackground="solid" radius="large">
            {/* <ThemePanel/> */}
            {children}
            <Toaster richColors />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
