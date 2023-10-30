import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Next.js, Appwrite, and Radix-UI Starter Kit",
  description:
    "Jumpstart your web application development with this comprehensive starter kit. Harness the power of Next.js for front-end development, Appwrite as your back-end server, and Radix-UI components for responsive user interfaces. Tailwind CSS streamlines styling for efficiency. Get started on your modern, responsive web app quickly with this all-in-one solution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Theme accentColor="iris" panelBackground="solid" radius="large">
          {/* <ThemePanel/> */}
          {children}
          <Toaster richColors />
        </Theme>
      </body>
    </html>
  );
}
