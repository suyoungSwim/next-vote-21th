import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

import ReactQueryProvider from "@/utils/reactQueryProvider";

import Header from "@/components/header/Header";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  display: "swap",
  style: "normal",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "CEOS 21th Vote",
  description: "CEOS 21기 투표 서비스",
  robots: "index, follow",
  authors: [{ name: "Sujin" }, { name: "Chaeyoung" }],
  icons: {
    icon: "/svgs/favicon.svg",
  },
  openGraph: {
    title: "CEOS 21th Vote",
    description: "CEOS 21기 활동을 위한 투표 플랫폼입니다.",
    url: "https://next-vote-21th.vercel.app",
    siteName: "CEOS Vote",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.className}>
      <body>
        <ReactQueryProvider>
          <div className="flex h-screen w-screen">
            <Header />
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
