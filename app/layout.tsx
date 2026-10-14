import type { Metadata } from "next";
import { Geist } from "next/font/google";
import FloatingSocialButtons from '@/components/FloatingSocialButtons';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jimtech.online"),
  applicationName: "JimTech AI Studio",
  title: {
    default: "JimTech AI Studio | AI-Powered Websites & Automation",
    template: "%s | JimTech AI Studio",
  },
  description:
    "JimTech AI Studio is an AI-powered digital agency building premium websites, business automation and AI solutions for businesses in Lagos, Nigeria and worldwide.",
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
  alternates: { canonical: "https://www.jimtech.online" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.jimtech.online",
    siteName: "JimTech AI Studio",
    title: "JimTech AI Studio | AI-Powered Websites & Automation",
    description:
      "JimTech AI Studio designs premium websites, automations, and AI-powered digital systems for businesses seeking digital growth and operational efficiency.",
    images: [{ url: "/jimtech-ai-studio-logo.png", width: 612, height: 408, alt: "JimTech AI Studio logo" }],
  },
  twitter: {
    card: "summary",
    title: "JimTech AI Studio | AI-Powered Websites & Automation",
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
  url: "https://www.jimtech.online",
  logo: "https://www.jimtech.online/jimtech-ai-studio-logo.png",
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
  "@id": "https://www.jimtech.online/#website",
  name: "JimTech AI Studio",
  url: "https://www.jimtech.online",
  description:
    "AI-powered websites, business automation, and digital growth solutions for ambitious businesses in Lagos, Nigeria and beyond.",
  inLanguage: "en-NG",
  publisher: { "@type": "Organization", name: "JimTech AI Studio" },
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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <FloatingSocialButtons />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </body>
    </html>
  );
}
 