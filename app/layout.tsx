import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moving to Hickory, NC? We'll Help You Find Home | Smith Realty Group",
  description: "Local real estate experts specializing in relocation buyers and new construction — homes $350K and up in the Hickory, NC area.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
