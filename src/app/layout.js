import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "@/components/Header.jsx";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Social Network",
  description: "A basic social network made by Theo using next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Theme accentColor="jade">
            <Header />
            {children}
            <ThemePanel />
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
