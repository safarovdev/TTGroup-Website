'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/card';
import { type Transfer } from '@/lib/transfers';
import { useMemo } from 'react';
import { vehicleCategoryMap } from '@/lib/vehicles';
import { getLocationName } from '@/lib/locations';
import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookingForm } from '@/components/booking-form';
import { useVehicles } from '@/hooks/useVehicles';

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const { data: allVehicles } = useVehicles();

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
    <Card key={transfer.id} className="flex flex-col p-6 text-center bg-card border">
        
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

        <div className="mt-6 grid grid-cols-3 gap-2 items-center">
             <div className="col-span-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="w-full font-semibold">{t('header.book')}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>{t('booking.title')}</DialogTitle>
                            <DialogDescription>{t('booking.description')}</DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                           <BookingForm bookingSubject={title} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                     <Button variant="outline" size="icon" className="w-full h-12">
                         <Info className="h-5 w-5" />
                     </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('transfers.detailsTitle', { title: title })}</DialogTitle>
                        <DialogDescription>
                            {t('transfers.detailsDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
                        {sortedPrices.map(priceInfo => (
                            <div key={priceInfo.category}>
                                <h4 className="font-semibold">{t(`vehicleCategories.${priceInfo.category}`)} - ${priceInfo.price}</h4>
                                {priceInfo.vehicleIds && priceInfo.vehicleIds.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 mt-1">
                                        {priceInfo.vehicleIds.map(id => {
                                            const vehicle = allVehicles?.find(v => v.id === id);
                                            return <li key={id}>{vehicle ? vehicle.name : id}</li>
                                        })}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground mt-1">{t('transfers.anyVehicleInCategory')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </Card>
  );
}
