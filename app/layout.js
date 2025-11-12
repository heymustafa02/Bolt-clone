import { GeistSans, GeistMono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";



export const metadata = {
  title: "Bolt.new Clone",
  description: "Build your next app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
       
      >
        <ConvexClientProvider>
        <Provider>
          {children}
          <Toaster />
        </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
