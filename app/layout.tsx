import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminary — Learning Dashboard",
  description: "Your personal learning hub",
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
