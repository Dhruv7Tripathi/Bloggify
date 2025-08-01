import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/(provider)/theme-provider"
import Provider from "@/components/(provider)/Provider";
import { Analytics } from "@vercel/analytics/next"
import SplashScreen from "@/components/splashscreen";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloggify",
  description: "Blogiffy is a modern, fast, and responsive blog application ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <Provider>
            <SplashScreen />
            {children}
          </Provider >
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
