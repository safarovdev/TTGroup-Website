"use client";

import { useTranslation } from '@/hooks/useTranslation';
import { useTransfers } from '@/hooks/useTransfers';
import { TransferCard } from '@/components/transfer-card';
import { cn } from '@/lib/utils';
import { useOnScreen } from '@/hooks/use-on-screen';
import { Skeleton } from '../ui/skeleton';
import { useVehicles } from '@/hooks/useVehicles';

export function FeaturedTransfers() {
  const { t } = useTranslation();
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.05 });
  const { data: transfers, loading: transfersLoading } = useTransfers({ isFeatured: true });
  const { data: vehicles, loading: vehiclesLoading } = useVehicles();


  if (!transfersLoading && (!transfers || transfers.length === 0)) {
    return null;
  }

  return (
    <section ref={ref} id="private-transfers" className="py-20 md:py-28 bg-muted/20 border-y">
      <div className="container">
        <div className={cn("text-center max-w-4xl mx-auto mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            {t('featuredTransfers.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t('featuredTransfers.description')}
          </p>
        </div>

        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-8", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-700 delay-200" : "opacity-0")}>
          {transfersLoading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)
          ) : (
            transfers?.map((route) => (
              <TransferCard key={route.id} transfer={route} vehicles={vehicles} vehiclesLoading={vehiclesLoading} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
