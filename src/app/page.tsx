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
import { FeaturedTransfers } from '@/components/sections/featured-transfers';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Principles />
        <FeaturedTransfers />
        <Stats />
        <FleetIntro />
        <Fleet />
        <Testimonials />
        <Faq />
        <Gallery />
        <Booking />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
