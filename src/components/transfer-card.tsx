'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { type Transfer, transferVehicleTypeMap } from '@/lib/transfers';

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const { t } = useTranslation();

  return (
    <Card key={transfer.id} className="flex flex-col p-6 text-center hover:shadow-xl transition-shadow duration-300">
        <div className="text-sm text-muted-foreground mb-3">
            <p>{t('transfers.drivingTime')}: {transfer.drivingTime}</p>
            <p>{t('transfers.drivingDistance')}: {transfer.drivingDistance}</p>
        </div>
        <h3 className="text-xl font-bold flex-grow flex items-center justify-center my-4">{transfer.title}</h3>
        <ul className="space-y-3 text-left">
            {transfer.prices.sort((a, b) => a.price - b.price).map((p) => (
            <li key={p.type} className="flex justify-between items-baseline border-t border-dashed pt-3 first:border-none first:pt-0">
                <span className="text-base text-muted-foreground">
                {t(transferVehicleTypeMap[p.type].nameKey)}{' '}
                <span className="text-xs">({t(transferVehicleTypeMap[p.type].capacityKey)})</span>
                </span>
                <span className="font-bold text-lg text-primary">${p.price}</span>
            </li>
            ))}
        </ul>
    </Card>
  );
}
