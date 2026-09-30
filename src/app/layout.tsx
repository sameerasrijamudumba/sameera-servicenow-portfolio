import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: { title: site.title, description: site.description, type: "website", ...(site.siteUrl ? { url: site.siteUrl, images: [{ url: "/og.png", width: 1536, height: 805, alt: "Sameera Srija J, ServiceNow Developer" }] } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, ...(site.siteUrl ? { images: ["/og.png"] } : {}) },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.role, homeLocation: { "@type": "Place", name: contact.location }, sameAs: contact.linkedInUrl ? [contact.linkedInUrl] : [] }) }} />
        {children}
      </body>
    </html>
  );
}
