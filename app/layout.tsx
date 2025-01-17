import type { Metadata } from "next";
import "./globals.css";
// import { ClientWrapper } from "./components/ClientWrapper";
import { Header } from "./components/Header";
import { ReactNode } from "react";
import { ScrollArea } from "./components/ui/scroll-area";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });
export const metadata: Metadata = {
  title: "Qiro Nillion Model",
  description: "Qiro Nillion Model",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} w-full`}>
        <div className="flex border-collapse max-h-screen overflow-hidden bg-secondary">
          <ScrollArea className="w-full h-screen p-4">
            <div className="flex flex-col py-4 gap-y-4">
              <Header />
              <section className="w-full h-full pb-4">
                <>{props.children}</>
              </section>
            </div>
          </ScrollArea>
        </div>
      </body>
    </html>
  );
}
