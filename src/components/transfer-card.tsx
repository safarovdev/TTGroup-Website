'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { type Transfer } from '@/lib/transfers';
import { useMemo } from 'react';
import type { Vehicle } from '@/lib/vehicles';
import { Users } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function TransferCard({ transfer, vehicles, vehiclesLoading }: { transfer: Transfer, vehicles: Vehicle[] | null, vehiclesLoading: boolean }) {
  const { t } = useTranslation();

  const pricedVehicles = useMemo(() => {
    if (!vehicles) return [];
    return transfer.prices.map(priceInfo => {
      const vehicle = vehicles.find(v => v.id === priceInfo.vehicleId);
      return {
        ...priceInfo,
        vehicle,
      };
    }).filter(item => !!item.vehicle)
      .sort((a, b) => a.price - b.price);
  }, [transfer.prices, vehicles]);

  return (
    <Card key={transfer.id} className="flex flex-col p-6 text-center hover:shadow-xl transition-shadow duration-300">
        <div className="text-sm text-muted-foreground mb-3">
            <p>{t('transfers.drivingTime')}: {transfer.drivingTime}</p>
            <p>{t('transfers.drivingDistance')}: {transfer.drivingDistance}</p>
        </div>
        <h3 className="text-xl font-bold flex-grow flex items-center justify-center my-4">{transfer.title}</h3>
        <ul className="space-y-3 text-left mt-auto pt-4">
            {vehiclesLoading ? (
                [...Array(2)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-md" />)
            ) : (
                pricedVehicles.length > 0 ? pricedVehicles.map((p) => (
                    <li key={p.vehicleId} className="flex justify-between items-center border-t border-dashed pt-3 first:border-none first:pt-0">
                        <div className='text-left'>
                            <span className="text-base text-foreground font-medium">
                                {p.vehicle?.name}
                            </span>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                <Users className="w-3 h-3" />
                                <span>{t('vehicleDetail.capacity', { count: p.vehicle!.capacity })}</span>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-primary">${p.price}</span>
                    </li>
                )) : <p className="text-sm text-muted-foreground">{t('transfers.noPrices')}</p>
            )}
        </ul>
    </Card>
  );
}
