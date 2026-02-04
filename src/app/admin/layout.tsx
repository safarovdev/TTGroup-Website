'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !user.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
        <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-8 shadow-sm">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 text-center">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32 mx-auto" />
            </div>
             <Skeleton className="h-10 w-48 mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
        <Header/>
        <main className="flex-grow bg-muted/40">
            {children}
        </main>
        <Footer/>
    </div>
  );
}
