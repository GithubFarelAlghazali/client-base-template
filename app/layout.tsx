import { Imperial_Script, Bodoni_Moda } from "next/font/google";
import "./floral-open.css";

const fontFancy = Imperial_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fancy",
});

const fontBase = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-base",
});

export const metadata = {
  title: "Client KasiSlamat",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${fontFancy.variable} ${fontBase.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
