import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Doc Search",
  description: "RAG over your codebase and documentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
