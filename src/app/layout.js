import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./StoreProvider";
import { connectToMongoDB } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });
connectToMongoDB();

export const metadata = {
  title: " JG Codes",
  description: "A very good memory for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-todo-black p-8`}>
        <section className="border relative h-full">
          <Navbar />
          <StoreProvider>{children}</StoreProvider>
        </section>
      </body>
    </html>
  );
}
