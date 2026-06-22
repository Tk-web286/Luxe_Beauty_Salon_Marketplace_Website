import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata = {
  title: "LUXE | Chennai's Premium Luxury Salon Marketplace",
  description: "Experience Chennai's finest startup-grade salon marketplace. Discover verified premium beauty salons, explore high-end grooming services, use AI-powered matchmaking, and book appointments instantly.",
  keywords: "salon chennai, luxury grooming chennai, beauty spa, hair stylist chennai, premium haircuts, AI salon match",
  openGraph: {
    title: "LUXE | Chennai's Premium Luxury Salon Marketplace",
    description: "Discover and book Chennai's finest luxury beauty salons with AI matching.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ backgroundColor: '#000000' }}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
