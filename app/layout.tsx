import type { Metadata } from "next";
import { Geist } from "next/font/google";
import FloatingSocialButtons from '@/components/FloatingSocialButtons';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jimtech.online"),
  applicationName: "JimTech AI Studio",
  title: {
    default: "JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth",
    template: "%s | JimTech AI Studio",
  },
  description:
    "JimTech AI Studio is an AI-powered digital agency specializing in premium website development, business automation, AI solutions, and digital transformation for businesses in Lagos, Nigeria and around the world.",
  keywords: [
    "JimTech AI Studio",
    "AI-powered websites",
    "website development",
    "business automation",
    "AI solutions",
    "digital transformation",
    "web development agency",
    "Lagos Nigeria",
    "digital agency",
  ],
  authors: [{ name: "JimTech AI Studio" }],
  creator: "JimTech AI Studio",
  publisher: "JimTech AI Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: "https://jimtech.online" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://jimtech.online",
    siteName: "JimTech AI Studio",
    title: "JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth",
    description:
      "JimTech AI Studio designs premium websites, automations, and AI-powered digital systems for businesses seeking digital growth and operational efficiency.",
    images: [{ url: "/jimtech-ai-studio-logo.png", width: 612, height: 408, alt: "JimTech AI Studio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth",
    description:
      "Premium websites, business automation, AI solutions and digital transformation for ambitious businesses in Lagos, Nigeria and beyond.",
    images: ["/jimtech-ai-studio-logo.png"],
  },
  icons: { icon: "/jimtech-ai-studio-logo.png", shortcut: "/jimtech-ai-studio-logo.png" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JimTech AI Studio",
  url: "https://jimtech.online",
  logo: "https://jimtech.online/jimtech-ai-studio-logo.png",
  email: "jimtechai30@gmail.com",
  telephone: "+2347037547765",
  sameAs: ["https://www.instagram.com/jimtechaistudio/"],
  description:
    "JimTech AI Studio is an AI-powered digital agency specializing in premium website development, business automation, artificial intelligence solutions, and digital transformation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  areaServed: "Worldwide",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JimTech AI Studio",
  url: "https://jimtech.online",
  description:
    "AI-powered websites, business automation, and digital growth solutions for ambitious businesses in Lagos, Nigeria and beyond.",
  inLanguage: "en-NG",
  publisher: { "@type": "Organization", name: "JimTech AI Studio" },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "JimTech AI Studio",
  url: "https://jimtech.online",
  description:
    "JimTech AI Studio builds premium websites, AI-powered systems, automation, and digital transformation solutions for businesses seeking sustainable growth.",
  isPartOf: { "@id": "https://jimtech.online/#website" },
  inLanguage: "en-NG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingSocialButtons />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </body>
    </html>
  );
}
 