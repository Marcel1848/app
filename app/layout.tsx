import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Klassik entdecken",
  description:
    "Entdecke zufällig ausgewählte Werke der klassischen Musik von 1600 bis 2000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cormorant.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
