import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
// Removed unused Script import
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Naaz Solution | e-Mitra, CSC & AI Digital Services",
  description:
    "Naaz Solution provides Rajasthan e-Mitra, CSC, Website Design, AI Invoice, AI Resume, IRCTC, DSC, Loan & Insurance and Digital Services.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable}`}
    >
<body className="min-h-screen bg-background text-foreground font-(--font-inter)">      
    {children}

        <Toaster
          richColors
          position="top-right"
          closeButton
        />
 
      </body>
    </html>
  );
}