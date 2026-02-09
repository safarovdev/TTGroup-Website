"use client";

import { useTranslation } from '@/hooks/useTranslation';
import { useTransfers } from '@/hooks/useTransfers';
import { TransferCard } from '@/components/transfer-card';
import { cn } from '@/lib/utils';
import { useOnScreen } from '@/hooks/use-on-screen';
import { Skeleton } from '../ui/skeleton';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";


export function FeaturedTransfers() {
  const { t } = useTranslation();
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.05 });
  const { data: transfers, loading: transfersLoading } = useTransfers({ isFeatured: true });
  
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);


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

        <div className={cn("w-full max-w-6xl mx-auto", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
          {transfersLoading ? (
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
          ) : transfers && transfers.length > 0 ? (
            <>
              <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
                <CarouselContent>
                  {transfers.map((route, index) => (
                    <CarouselItem key={route.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2 h-full">
                        <TransferCard transfer={route} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-12 hidden md:inline-flex" />
                <CarouselNext className="-right-4 md:-right-12 hidden md:inline-flex" />
              </Carousel>
              <div className="flex justify-center gap-2 mt-8">
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
      </div>
    </section>
  );
}
