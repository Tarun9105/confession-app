import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { MobileAppShell } from "@/components/mobile-app-shell";
import { PWASupport } from "@/components/pwa-support";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"]
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"]
});

export const metadata = {
  title: "Confessly",
  description: "Anonymous confessions, quiet honesty, and a faster social experience."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${plusJakartaSans.variable}`}>
        {children}
        <MobileAppShell />
        <PWASupport />
      </body>
    </html>
  );
}
