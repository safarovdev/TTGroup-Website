'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect to handle turning the loader OFF when navigation completes
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    // We only want to run this effect when the path changes, not when `loading` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Effect to handle turning the loader ON when a link is clicked
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Find the closest 'a' tag, in case the click is on a child element (e.g., an icon inside a button)
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        const targetAttr = anchor.getAttribute('target');
        
        // Use URL to safely parse the href
        const currentUrl = new URL(window.location.href);
        const nextUrl = new URL(href || '', currentUrl);

        // Check if it's an internal navigation to a different page/path.
        // We compare `href` to avoid triggering on hash links on the same page.
        if (
          href &&
          nextUrl.origin === currentUrl.origin &&
          nextUrl.href !== currentUrl.href &&
          targetAttr !== '_blank'
        ) {
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []); // Run this effect only once on mount

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
