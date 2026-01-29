import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Fleet } from '@/components/sections/fleet';
import { Principles } from '@/components/sections/principles';
import { Booking } from '@/components/sections/booking';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Fleet />
        <Principles />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
