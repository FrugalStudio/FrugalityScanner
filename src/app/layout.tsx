import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frugality Scanner | Operational Intelligence Assessment",
  description: "Identify operational waste, workflow friction, founder dependency, and automation opportunities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
