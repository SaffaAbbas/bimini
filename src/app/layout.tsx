import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./components/MotionProvider";
import { SiteFooter } from "./components/SiteFooter";
import { WhatsAppFloatButton } from "./components/WhatsAppFloatButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toursbimini.com"),
  title: {
    default: "Bimini Tours & Adventures",
    template: "%s | Bimini Tours & Adventures",
  },
  // Description is set per page (home, contact, tours, etc.) — not inherited here.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <MotionProvider>
          {children}
          <SiteFooter />
          <WhatsAppFloatButton />
        </MotionProvider>
      </body>
    </html>
  );
}
