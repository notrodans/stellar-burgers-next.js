import type { Metadata } from "next";
import { Iceland, JetBrains_Mono } from "next/font/google";
import { RootLayout } from "./_/layouts/root-layout";
import { AppLoader } from "./_/loaders/app-loader";
import { AppProvider } from "./_/providers/app-provider";
import "./globals.css";

const icelandFont = Iceland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-iceland",
  display: "swap",
});

const jetBrainsMonoFont = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stellar Burgers",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GetHead />
      <body
        className={`${icelandFont.variable} ${jetBrainsMonoFont.variable} antialiased`}
      >
        <AppLoader>
          <AppProvider>
            <RootLayout>{children}</RootLayout>
          </AppProvider>
        </AppLoader>
        <div id="modals" />
      </body>
    </html>
  );
}

const GetHead = () => {
  return (
    <head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favs/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favs/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favs/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favs/safari-pinned-tab.svg"
        color="#801ab3"
      />
      <link rel="shortcut icon" href="/favs/favicon.ico" />
      <meta name="msapplication-TileColor" content="#801ab3" />
      <meta name="msapplication-config" content="/favs/browserconfig.xml" />
      <meta name="theme-color" content="#801ab3" />
    </head>
  );
};
