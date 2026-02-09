'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { type Transfer } from '@/lib/transfers';
import { useMemo } from 'react';
import { vehicleCategoryMap } from '@/lib/vehicles';
import { getLocationName } from '@/lib/locations';
import { ArrowRight } from 'lucide-react';

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const { t } = useTranslation();
  const { locale } = useLanguage();

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

  const title = transfer[`title_${locale}`] || transfer.title_ru;
  const description = transfer[`description_${locale}`];

  return (
    <Card key={transfer.id} className="flex flex-col p-6 text-center hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="text-sm text-muted-foreground mb-3">
            <span>{t('transfers.drivingTime')}: {transfer.drivingTime}</span>
            <span className="mx-2">·</span>
            <span>{t('transfers.drivingDistance')}: {transfer.drivingDistance}</span>
        </div>
        
        <h3 className="text-xl font-bold flex-grow flex items-center justify-center my-4">{title}</h3>
        
        {transfer.serviceType === 'intercity' && transfer.from && transfer.to && (
            <div className='flex items-center justify-center gap-2 text-muted-foreground font-semibold mb-4'>
                <span>{getLocationName(transfer.from, locale)}</span>
                <ArrowRight className='h-4 w-4'/>
                <span>{getLocationName(transfer.to, locale)}</span>
            </div>
        )}
        {transfer.serviceType !== 'intercity' && transfer.city && (
            <div className='text-muted-foreground font-semibold mb-4'>
                {t('transfers.city')}: {getLocationName(transfer.city, locale)}
            </div>
        )}
        
        {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

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
