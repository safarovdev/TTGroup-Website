import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { FirebaseClientProvider } from '@/firebase';
import { Suspense } from 'react';
import { PageLoader } from '@/components/layout/page-loader';

const siteConfig = {
  name: "TourEast Transport Group",
  url: "https://ttgroup.uz", // Replace with your actual domain
  ogImage: "/images/background.jpg", // A good OG image for sharing
  description: "Профессиональные пассажирские перевозки по Узбекистану. Трансферы из аэропорта, туры по городам (Ташкент, Самарканд, Бухара, Хива), аренда авто с водителем. Комфорт, безопасность и премиум-сервис от TourEast Transport Group.",
  keywords: ["трансферы Узбекистан", "туры Узбекистан", "аренда авто Узбекистан", "трансферы Ташкент", "трансферы Самарканд", "трансферы Бухара", "трансферы Хива", "гид Узбекистан", "пассажирские перевозки", "trip transfers", "uzbekistan tours", "uzbekistan transfers", "rent car uzbekistan"],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Трансферы и туры по Узбекистану - Ташкент, Самарканд, Бухара | TourEast Transport Group",
    template: `%s | TourEast Transport Group`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,

  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/ru',
      'en-US': '/en',
    },
  },

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

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.description,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  
  icons: {
    icon: '/favicon.ico', // Make sure to have a favicon.ico in your public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "bg-background")}>
        <FirebaseClientProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <Suspense fallback={null}>
                <PageLoader />
              </Suspense>
              {children}
              <Toaster />
            </CurrencyProvider>
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
