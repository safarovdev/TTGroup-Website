'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { type Vehicle } from '@/lib/vehicles';
import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Check, Users, Armchair, Sun, Car, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookingForm } from '@/components/booking-form';

const featureIcons: { [key: string]: React.ReactElement } = {
    'meet_and_greet': <Star />,
    'air_conditioner': <Check />,
    'panoramic_view': <Sun />,
    'ottoman': <Armchair />,
    'tinted_windows': <Check />,
    'city_tours': <Car />,
};

const VehicleDetailPage = () => {
    const { id } = useParams();
    const firestore = useFirestore();
    const { t } = useTranslation();

    const vehicleRef = useMemoFirebase(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'vehicles', Array.isArray(id) ? id[0] : id);
    }, [firestore, id]);

    const { data: vehicle, isLoading } = useDoc<Vehicle>(vehicleRef);

    const [mainImage, setMainImage] = useState<string | null>(null);

    React.useEffect(() => {
        if (vehicle && vehicle.imageUrls.length > 0) {
            setMainImage(vehicle.imageUrls[0]);
        }
    }, [vehicle]);

    const getFeatureIcon = (featureKey: string) => {
        return featureIcons[featureKey] || <Check />;
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col bg-muted/20">
                <Header />
                <main className="flex-grow py-12 md:py-20">
                    <div className="container">
                        <Skeleton className="h-12 w-1/2 mb-8" />
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                            <div>
                                <Skeleton className="aspect-video w-full rounded-xl" />
                                <div className="grid grid-cols-5 gap-2 mt-4">
                                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-md" />)}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <Skeleton className="h-8 w-1/3" />
                                <Skeleton className="h-10 w-1/4" />
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-2/3" />
                                </div>
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center text-center">
                    <div>
                        <h1 className="text-4xl font-bold">Vehicle Not Found</h1>
                        <p className="mt-4 text-muted-foreground">Sorry, we couldn't find the vehicle you're looking for.</p>
                        <Button asChild className="mt-6">
                            <Link href="/fleet">Back to Fleet</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <Header />
            <main className="flex-grow py-12 md:py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">{vehicle.name}</h1>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        {/* Image Gallery */}
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted mb-4 cursor-pointer hover:opacity-90 transition-opacity">
                                        {mainImage && <Image src={mainImage} alt={vehicle.name} fill className="object-cover" />}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-none w-auto h-auto bg-transparent border-none shadow-none p-0 flex items-center justify-center">
                                     <DialogHeader className="sr-only">
                                        <DialogTitle>{vehicle.name}</DialogTitle>
                                        <DialogDescription>{t('vehicleDetail.imagePopupDescription', { name: vehicle.name })}</DialogDescription>
                                     </DialogHeader>
                                    {mainImage && (
                                        <Image 
                                            src={mainImage} 
                                            alt={vehicle.name} 
                                            width={1800} 
                                            height={1200} 
                                            className="max-w-[95vw] max-h-[95vh] h-auto w-auto object-contain rounded-lg"
                                        />
                                    )}
                                </DialogContent>
                            </Dialog>
                            <div className="grid grid-cols-5 gap-2">
                                {vehicle.imageUrls.map(url => (
                                    <div
                                        key={url}
                                        onClick={() => setMainImage(url)}
                                        className={cn(
                                            "relative aspect-square w-full overflow-hidden rounded-md cursor-pointer border-2 transition-all",
                                            mainImage === url ? "border-primary" : "border-transparent hover:border-primary/50"
                                        )}
                                    >
                                        <Image src={url} alt="Vehicle thumbnail" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                            <p className="text-sm uppercase tracking-widest text-muted-foreground">{t(`vehicleCategories.${vehicle.category}`)}</p>
                            
                            <div className="mt-4">
                                {vehicle.price && vehicle.price > 0 ? (
                                    <p className="text-4xl font-bold text-primary">{t('vehicleDetail.priceLabel', { price: vehicle.price })}</p>
                                ) : (
                                    <p className="text-2xl font-bold text-primary">{t('vehicleDetail.negotiablePrice')}</p>
                                )}
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 text-lg">
                                    <Users className="w-6 h-6 text-primary" />
                                    <span>{t('vehicleDetail.capacity', { count: vehicle.capacity })}</span>
                                </div>
                                {vehicle.featureKeys && vehicle.featureKeys.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-lg mb-2 mt-6">{t('vehicleDetail.features')}</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            {vehicle.featureKeys.map(key => (
                                                <li key={key} className="flex items-center gap-3">
                                                    {React.cloneElement(getFeatureIcon(key), { className: 'w-5 h-5 text-primary/80' })}
                                                    <span>{t(`vehicleFeatures.${key}`)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-grow" />

                            <Dialog>
                                <DialogTrigger asChild>
                                     <Button size="lg" className="w-full mt-10 font-bold text-lg h-14">{t('header.book')}</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[625px]">
                                    <DialogHeader>
                                        <DialogTitle>{t('booking.title')}</DialogTitle>
                                        <DialogDescription>{t('booking.description')}</DialogDescription>
                                    </DialogHeader>
                                    <div className="pt-4">
                                       <BookingForm defaultVehicleName={vehicle.name} />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VehicleDetailPage;
