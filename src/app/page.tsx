import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Principles } from '@/components/sections/principles';
import { Booking } from '@/components/sections/booking';
import { Stats } from '@/components/sections/stats';
import { FleetIntro } from '@/components/sections/fleet-intro';
import { Fleet } from '@/components/sections/fleet';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Contacts } from '@/components/sections/contacts';
import { Gallery } from '@/components/sections/gallery';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Principles />
        <Stats />
        <FleetIntro />
        <Fleet />
        <Testimonials />
        <Faq />
        <Gallery />
        <Suspense fallback={
          <section id="booking-loading" className="py-20 md:py-28 bg-primary">
            <div className="container flex items-center justify-center" style={{minHeight: '600px'}}>
              <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
            </div>
          </section>
        }>
          <Booking />
        </Suspense>
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
