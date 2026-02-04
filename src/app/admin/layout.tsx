import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-muted/40">
        {children}
      </main>
      <Footer />
    </div>
  );
}
