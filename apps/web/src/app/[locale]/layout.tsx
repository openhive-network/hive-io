import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { LayoutContent } from '@/components/LayoutContent';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SOCIAL_MEDIAS } from '@/lib/data/socialmedias';
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
  // Non-production CI builds (staging, branch builds) set SITE_NOINDEX=1 so
  // search engines drop them. Unset (local and master builds) emits no tag.
  ...(process.env.SITE_NOINDEX === "1" && {
    robots: { index: false, follow: false },
  }),
};

// Site-wide structured data so search and answer engines tie hive.io to its
// official profiles. gitlab.hive.io redirects to the group below, so the final
// URL is used for that entry; GitHub uses the organization, not one repo.
// Wikidata Q88783712 is the Hive entity that knowledge graphs key on.
const GITLAB_URL = "https://gitlab.syncad.com/hive";
const GITHUB_URL = "https://github.com/openhive-network";
const WIKIDATA_URL = "https://www.wikidata.org/wiki/Q88783712";
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hive.io/#organization",
      name: "Hive",
      description:
        "Hive is a feeless, community-owned blockchain and a public social and identity layer for the open web. Build on Hive's open-source full stack, or extend cross-chain and web apps with Hive accounts, posts and payments that confirm in less than 3 seconds.",
      url: "https://hive.io/",
      logo: "https://hive.io/icon.png",
      sameAs: [
        ...SOCIAL_MEDIAS.map((social) =>
          social.icon === "gitlab"
            ? GITLAB_URL
            : social.icon === "github"
              ? GITHUB_URL
              : social.link
        ),
        WIKIDATA_URL,
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://hive.io/#website",
      url: "https://hive.io/",
      name: "Hive",
      alternateName: ["Hive blockchain", "hive.io"],
      publisher: { "@id": "https://hive.io/#organization" },
    },
  ],
};
const STRUCTURED_DATA_JSON = JSON.stringify(STRUCTURED_DATA).replace(
  /</g,
  "\\u003c"
);

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
  if (!hasLocale(routing.locales, locale)) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA_JSON }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutContent>{children}</LayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
