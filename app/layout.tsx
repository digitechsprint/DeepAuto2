import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { FloatingActions, SiteFooter, SiteHeader } from "@/components/site";
import { ScrollEffects } from "@/components/scroll-effects";
import "./globals.css";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Deep Auto Electricals | Automotive Wire Harness & Terminal Manufacturer, Delhi",
    template: "%s | Deep Auto Electricals",
  },
  description:
    "IATF 16949 & ISO 9001 certified manufacturer of automotive wire harnesses, cables, terminals, PVC sleeves, sheet metal and moulded parts in Delhi NCR. Trust On Quality, since 1998.",
  metadataBase: new URL("https://deepautoelectricals.com"),
  openGraph: { siteName: "Deep Auto Electricals", locale: "en_IN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0B1F3A" };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Deep Auto Electricals Pvt. Ltd.",
  alternateName: "DAEPL",
  slogan: "Trust On Quality",
  foundingDate: "1998",
  url: "https://deepautoelectricals.com",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <SiteHeader />
        <ScrollEffects />
        <main>{children}</main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
