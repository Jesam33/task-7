import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./StoreProvider"; // If StoreProvider is for Redux, you may remove it if not needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JG Codes",
  description: "A very good memory for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-todo-black p-8`}>
        <section className="border relative h-full">
          <Navbar />
          {/* Remove StoreProvider if not using Redux anymore */}
          <StoreProvider>{children}</StoreProvider>
        </section>
      </body>
    </html>
  );
}
