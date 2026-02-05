"use client";

import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { privateTransfers, transferVehicleTypes } from '@/lib/transfers';
import { cn } from '@/lib/utils';
import { useOnScreen } from '@/hooks/use-on-screen';

export function PrivateTransfers() {
  const { t } = useTranslation();
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={ref} id="private-transfers" className="py-20 md:py-28 bg-muted/20 border-y">
      <div className="container">
        <div className={cn("text-center max-w-4xl mx-auto mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            {t('privateTransfers.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t('privateTransfers.description')}
          </p>
        </div>

        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-8", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-700 delay-200" : "opacity-0")}>
          {privateTransfers.map((route) => (
            <Card key={route.id} className="flex flex-col p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-sm text-muted-foreground mb-3">
                    <p>{t('privateTransfers.drivingTime')}: {t(route.drivingTimeKey)}</p>
                    <p>{t('privateTransfers.drivingDistance')}: {t(route.drivingDistanceKey)}</p>
                </div>
                <h3 className="text-xl font-bold flex-grow flex items-center justify-center my-4">{t(route.titleKey)}</h3>
                <ul className="space-y-3 text-left">
                    {route.prices.map((p) => (
                    <li key={p.type} className="flex justify-between items-baseline border-t border-dashed pt-3 first:border-none first:pt-0">
                        <span className="text-base text-muted-foreground">
                        {t(transferVehicleTypes[p.type].nameKey)}{' '}
                        <span className="text-xs">({t(transferVehicleTypes[p.type].capacityKey)})</span>
                        </span>
                        <span className="font-bold text-lg text-primary">${p.price}</span>
                    </li>
                    ))}
                </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
