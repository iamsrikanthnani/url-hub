import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Text, Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "URL-Hub - Explore and Share Valuable Website Links",
  description:
    "Discover a curated collection of valuable website links and contribute to the knowledge hub by sharing your favorite online resources. Join URL Hub today!",
};

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
