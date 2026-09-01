import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthTrack — Personal Well-being Tracker",
  description: "บันทึกและติดตามสุขภาพกายและสุขภาพจิตประจำวัน",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}