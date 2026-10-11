import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { LayoutContent } from '@/components/LayoutContent';
import { GoogleAnalytics, GTMNoScript } from '@/components/analytics/GoogleAnalytics';
import '../globals.css';
import '@/lib/fontawesome';
import 'tippy.js/dist/tippy.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hive.io'),
  title: "Hive - The Blockchain & Cryptocurrency for Web3",
  description: "Hive is a feeless, community-owned blockchain and a public social and identity layer for the open web.",
  openGraph: {
    title: "Hive - The Blockchain & Cryptocurrency for Web3",
    description: "Hive is a feeless, community-owned blockchain and a public social and identity layer for the open web.",
    url: "https://hive.io",
    siteName: "Hive",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages directly for static export
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body>
        <GTMNoScript />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutContent>{children}</LayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
