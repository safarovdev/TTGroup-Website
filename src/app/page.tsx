import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Principles } from '@/components/sections/principles';
import { Booking } from '@/components/sections/booking';
import { Stats } from '@/components/sections/stats';
import { FleetIntro } from '@/components/sections/fleet-intro';
import { Fleet } from '@/components/sections/fleet';
import { Testimonials } from '@/components/sections/testimonials';

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
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
