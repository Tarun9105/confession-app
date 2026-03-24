import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${plusJakartaSans.variable}`}>
        {children}
        <PWASupport />
      </body>
    </html>
  );
}
