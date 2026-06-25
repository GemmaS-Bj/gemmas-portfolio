import type { Metadata } from "next";
import { Geist_Mono, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const spotifyMix = localFont({
  src: "../fonts/SpotifyMix-Medium.woff",
  variable: "--font-spotify-mix",
  display: "swap",
  weight: "500",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GemmaS",
  description: "Agence de développement de logiciels, technologies modernes, résultats concrets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spotifyMix.variable} ${workSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${workSans.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
