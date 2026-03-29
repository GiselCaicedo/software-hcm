import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INMOV HCM",
  description: "Plataforma de gestión del talento humano",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
