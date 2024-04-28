import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./Components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Dashboard",
  description: "Generated by create next app By Hamada-99-77",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="flex min-h-screen bg-gray-100" /*main: contains Sidebar and Content*/
        >
          <Sidebar />

          <div className="" /*Content*/>{children}</div>
        </main>
      </body>
    </html>
  );
}
