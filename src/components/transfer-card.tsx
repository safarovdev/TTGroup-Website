'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { type Transfer } from '@/lib/transfers';
import { useMemo } from 'react';
import { vehicleCategoryMap } from '@/lib/vehicles';

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const { t } = useTranslation();

  const sortedPrices = useMemo(() => {
    if (!transfer.prices) return [];
    
    const categoryOrder: (keyof typeof vehicleCategoryMap)[] = ['comfort', 'premium', 'minivan', 'bus'];
    
    return [...transfer.prices].sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [transfer.prices]);

  return (
    <Card key={transfer.id} className="flex flex-col p-6 text-center hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="text-sm text-muted-foreground mb-3">
            <p>{t('transfers.drivingTime')}: {transfer.drivingTime}</p>
            <p>{t('transfers.drivingDistance')}: {transfer.drivingDistance}</p>
        </div>
        <h3 className="text-xl font-bold flex-grow flex items-center justify-center my-4">{transfer.title}</h3>
        <ul className="space-y-3 text-left mt-auto pt-4 border-t">
            {sortedPrices.length > 0 ? sortedPrices.map((p) => (
                <li key={p.category} className="flex justify-between items-center">
                    <span className="text-base text-muted-foreground font-medium">
                        {t(`vehicleCategories.${p.category}`)}
                    </span>
                    <span className="font-bold text-lg text-primary">${p.price}</span>
                </li>
            )) : <p className="text-sm text-muted-foreground text-center">{t('transfers.noPrices')}</p>}
        </ul>
    </Card>
  );
}
