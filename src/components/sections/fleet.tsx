"use client";

import Link from "next/link";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/hooks/use-on-screen";
import { useTranslation } from "@/hooks/useTranslation";
import { VehicleCard } from "@/components/vehicle-card";
import { useVehicles } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";

export function Fleet() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.1 });
  const { t } = useTranslation();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { data: popularVehicles, loading } = useVehicles({ isFeatured: true });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      if (api) {
        setCurrent(api.selectedScrollSnap());
      }
    };
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  return (
    <section ref={ref} id="fleet" className="py-20 md:py-28 bg-muted/20">
      <div className="container">
        <div className="text-center">
          <div className={cn(isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('fleet.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('fleet.description')}
            </p>
          </div>
          <div className={cn("w-full max-w-6xl mx-auto mt-12", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
              {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3 bg-card p-4 rounded-xl">
                            <Skeleton className="h-[225px] w-full rounded-lg" />
                            <div className="space-y-3 pt-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-full mt-4" />
                            </div>
                        </div>
                    ))}
                  </div>
              ) : popularVehicles && popularVehicles.length > 0 ? (
                <>
                <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                    <CarouselContent>
                        {popularVehicles.map((vehicle, index) => (
                            <CarouselItem key={vehicle.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-2 h-full">
                                    <VehicleCard vehicle={vehicle} priority={index < 3} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 md:-left-12 hidden md:inline-flex" />
                    <CarouselNext className="-right-4 md:-right-12 hidden md:inline-flex" />
                </Carousel>
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`${t('fleet.goToSlide')} ${index + 1}`}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all duration-300",
                                current === index ? 'w-4 bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                            )}
                        />
                    ))}
                </div>
                </>
              ) : null}
          </div>
          
          <div className={cn("mt-20 text-center border-t pt-16", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-300" : "opacity-0")}>
            <h3 className="text-2xl font-bold tracking-tight">{t('fleet.notFound.title')}</h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {t('fleet.notFound.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/fleet">{t('fleet.notFound.allModelsButton')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold">
                <Link href="/#booking">{t('fleet.notFound.contactUsButton')}</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
