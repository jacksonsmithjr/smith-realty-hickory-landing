import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moving to Hickory, NC? We'll Help You Find Home | Smith Realty Group",
  description:
    "Local real estate experts specializing in relocation buyers and new construction — homes $350K and up in the Hickory, NC area.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B5KZ2EZLBL"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B5KZ2EZLBL');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
