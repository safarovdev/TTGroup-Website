"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Snowflake, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useOnScreen } from '@/hooks/use-on-screen';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicles } from '@/hooks/useVehicles';
import { Skeleton } from '@/components/ui/skeleton';
import { type Vehicle } from '@/lib/vehicles';

export function FleetIntro() {
    const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.1 });
    const { t } = useTranslation();
    const { data: vehicles, loading } = useVehicles();
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);

    const fleetCategories = useMemo(() => {
        if (!vehicles) return [];
        const categoryOrder: Vehicle['category'][] = ['premium', 'comfort', 'minivan', 'bus'];
        const categoryInfo: Record<Vehicle['category'], { nameKey: string; descriptionKey: string }> = {
            premium: { nameKey: 'fleetIntro.categories.premium.name', descriptionKey: 'fleetIntro.categories.premium.description' },
            comfort: { nameKey: 'fleetIntro.categories.comfort.name', descriptionKey: 'fleetIntro.categories.comfort.description' },
            minivan: { nameKey: 'fleetIntro.categories.minivans.name', descriptionKey: 'fleetIntro.categories.minivans.description' },
            bus: { nameKey: 'fleetIntro.categories.buses.name', descriptionKey: 'fleetIntro.categories.buses.description' },
        };

        const grouped = vehicles.reduce((acc, vehicle) => {
            (acc[vehicle.category] = acc[vehicle.category] || []).push(vehicle.id);
            return acc;
        }, {} as Record<string, string[]>);
        
        return categoryOrder
            .map(catId => ({
                id: catId,
                nameKey: categoryInfo[catId].nameKey,
                descriptionKey: categoryInfo[catId].descriptionKey,
                vehicle_ids: grouped[catId] || [],
            }))
            .filter(cat => cat.vehicle_ids.length > 0);

    }, [vehicles]);


    useEffect(() => {
        if (loading || fleetCategories.length === 0) return;

        const interval = setInterval(() => {
            const randomCategoryIndex = Math.floor(Math.random() * fleetCategories.length);
            const vehicleIds = fleetCategories[randomCategoryIndex].vehicle_ids;
            
            if (!vehicleIds || vehicleIds.length === 0) return;

            const randomVehicleIndex = Math.floor(Math.random() * vehicleIds.length);

            setActiveCategoryIndex(randomCategoryIndex);
            setActiveVehicleIndex(randomVehicleIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [loading, fleetCategories]);

    const standards = [
      { 
          icon: <Calendar className="w-8 h-8" />, 
          title: t('fleetIntro.standards.fresh.title'), 
          description: t('fleetIntro.standards.fresh.description')
      },
      { 
          icon: <Sparkles className="w-8 h-8" />, 
          title: t('fleetIntro.standards.clean.title'), 
          description: t('fleetIntro.standards.clean.description')
      },
      { 
          icon: <Snowflake className="w-8 h-8" />, 
          title: t('fleetIntro.standards.comfort.title'), 
          description: t('fleetIntro.standards.comfort.description')
      },
      { 
          icon: <ShieldCheck className="w-8 h-8" />, 
          title: t('fleetIntro.standards.safety.title'), 
          description: t('fleetIntro.standards.safety.description')
      },
    ];

    const activeCategory = useMemo(() => {
        return fleetCategories[activeCategoryIndex];
    }, [fleetCategories, activeCategoryIndex]);
    
    const activeVehicleId = useMemo(() => {
        if (!activeCategory) return null;
        const vehicleIds = activeCategory.vehicle_ids;
        if (!vehicleIds || vehicleIds.length === 0) return null;
        const index = activeVehicleIndex % vehicleIds.length;
        return vehicleIds[index];
    }, [activeCategory, activeVehicleIndex]);

    const activeVehicle = useMemo(() => {
        if (!vehicles || !activeVehicleId) return null;
        return vehicles.find(v => v.id === activeVehicleId) || null;
    }, [activeVehicleId, vehicles]);
    
    const imageUrl = activeVehicle?.imageUrl || "/images/placeholder.jpg";

    return (
        <section ref={ref} id="fleet-intro" className="py-20 md:py-28 bg-muted/20 border-b">
            <div className="container">
                {/* 1. Headline */}
                <div className={cn("text-center max-w-4xl mx-auto mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" dangerouslySetInnerHTML={{ __html: t('fleetIntro.title') }} />
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                        {t('fleetIntro.description')}
                    </p>
                </div>

                {/* 2. Interactive Gallery */}
                <div className={cn("grid lg:grid-cols-12 gap-8 md:gap-12 mb-20 items-center", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
                    {/* Left: Categories */}
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-4">
                            {loading ? (
                                [...Array(4)].map((_, i) => <Skeleton key={i} className="h-[98px] w-full rounded-2xl" />)
                            ) : fleetCategories.map((category, index) => (
                                <div
                                    key={category.nameKey}
                                    className={cn(
                                        'p-6 rounded-2xl text-left transition-all duration-500 border-2',
                                        activeCategoryIndex === index
                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg cursor-default'
                                            : 'bg-card border-transparent'
                                    )}
                                >
                                    <p className="font-bold text-xl">{t(category.nameKey)}</p>
                                    <p className={cn('text-sm mt-1', activeCategoryIndex === index ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{t(category.descriptionKey)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="lg:col-span-8 relative aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group bg-muted">
                         {loading ? <Skeleton className="h-full w-full" /> : (
                            <>
                                <Image
                                    key={activeVehicleId}
                                    src={imageUrl}
                                    alt={activeVehicle?.name || 'Flagship vehicle'}
                                    fill
                                    className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105 animate-in fade-in duration-1000"
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    data-ai-hint={activeVehicle?.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                {activeVehicle && activeCategory && (
                                <div
                                    key={activeVehicleId + '-text'} 
                                    className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white animate-in fade-in-0 slide-in-from-bottom-5 duration-700"
                                >
                                    <p className="text-sm uppercase tracking-widest text-white/80">{t(activeCategory.nameKey)}</p>
                                    <h4 className="text-2xl md:text-4xl font-bold drop-shadow-md mt-1">{activeVehicle?.name}</h4>
                                </div>
                                )}
                            </>
                         )}
                    </div>
                </div>

                {/* 3. Standards Block */}
                 <div className={cn("mb-20", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-300" : "opacity-0")}>
                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                         {standards.map(standard => (
                            <Card key={standard.title} className="border-0 bg-transparent shadow-none">
                               <CardContent className="p-0 flex items-start gap-4">
                                 <div className="flex-shrink-0 mt-1 p-3 bg-primary/10 rounded-full text-primary">
                                     {standard.icon}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1">{standard.title}</h4>
                                     <p className="text-sm text-muted-foreground">{standard.description}</p>
                                 </div>
                               </CardContent>
                            </Card>
                         ))}
                     </div>
                 </div>

                {/* 4. SEO Block */}
                <div className={cn("max-w-5xl mx-auto text-center", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-400" : "opacity-0")}>
                    <h3 className="text-3xl font-bold mb-4">{t('fleetIntro.seo.title')}</h3>
                    <p className="text-lg text-muted-foreground">
                        {t('fleetIntro.seo.description')}
                    </p>
                </div>
            </div>
        </section>
    );
}
