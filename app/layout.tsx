import type { Metadata } from "next";
import "./globals.css";
// import { ClientWrapper } from "./components/ClientWrapper";
import { Header } from "./components/Header";
import { ReactNode } from "react";
import { ScrollArea } from "./components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Create Nillion App",
  description: "Quickstart a Nillion fullstack app",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex border-collapse max-h-screen overflow-hidden bg-secondary gap-4 pr-4">
        <ScrollArea className="w-full h-screen">
          <div className="flex flex-col py-4 gap-y-4">
            <Header />
            <section className="w-full h-full pb-4">
              <>{props.children}</>
            </section>
          </div>
        </ScrollArea>
      </body>
    </html>
  );
}
