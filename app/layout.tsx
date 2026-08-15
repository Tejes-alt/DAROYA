import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAROYA — A Journey Beyond the Horizon",
  description: "An interactive archive of India's journey into space, from 1947 to 2026 and toward 2047.",
  metadataBase: new URL("https://daroya.local")
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
