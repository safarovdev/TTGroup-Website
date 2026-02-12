'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // On navigation, set loading to true.
    setLoading(true);

    // After a delay (simulating page load), set loading to false.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Adjust this value to feel right.

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]); // Rerun on every navigation.

  return (
    <div
      role="status"
      className={cn(
        'fixed top-0 left-0 z-[9999] h-1 w-full bg-primary transition-all duration-700 ease-out',
        // When loading, animate width to 90%. When done, animate to 100% and fade out.
        loading ? 'w-[90%]' : 'w-full opacity-0'
      )}
    />
  );
}
