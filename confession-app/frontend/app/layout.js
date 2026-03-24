import { Sora, Space_Grotesk } from "next/font/google";
import { PWASupport } from "@/components/pwa-support";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"]
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"]
});

export const metadata = {
  title: "Confessly",
  description: "Anonymous confessions, quiet honesty, and a faster social experience."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${spaceGrotesk.variable}`}>
        {children}
        <PWASupport />
      </body>
    </html>
  );
}
