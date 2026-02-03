"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Briefcase, Users, Star, Sun, Zap, Armchair, Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicles, Vehicle } from "@/lib/vehicles";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const popular_ids = ["fleet-lixiang-l7", "fleet-kia-k5", "fleet-hyundai-staria", "fleet-chevrolet-tahoe-rs", "fleet-mercedes-s500"];
const popularVehicles = popular_ids
  .map(id => Vehicles.find(v => v.id === id))
  .filter((v): v is NonNullable<typeof v> => v !== undefined);

const VehicleCard = ({ vehicleId }: { vehicleId: string }) => {
  const vehicle = Vehicles.find(v => v.id === vehicleId);
  const [isLoading, setIsLoading] = React.useState(!!vehicle?.imageUrl);
  
  if (!vehicle) return null;

  const finalImageUrl = vehicle.imageUrl || "/images/placeholder.jpg";
  
  const featureIcons: { [key: string]: React.ReactElement } = {
    'мест': <Users />,
    'пассажир': <Users />,
    'салон': <Armchair />,
    'панорама': <Sun />,
    'электро': <Zap />,
    'внедорожник': <Car />,
    'кроссовер': <Car />,
    'vip': <Star />,
    'бизнес': <Briefcase />,
    'кресла': <Armchair />,
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    for (const key in featureIcons) {
      if (lowerFeature.includes(key)) {
        return React.cloneElement(featureIcons[key], { className: 'w-5 h-5 text-primary' });
      }
    }
    return <Check className="w-5 h-5 text-primary" />;
  };
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
            {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}
            <Image
                src={finalImageUrl}
                alt={vehicle.name}
                fill
                className={cn(
                    "object-cover transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                data-ai-hint={vehicle.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl font-bold">{vehicle.name}</CardTitle>
        
        {vehicle.features && (
          <ul className="space-y-2 text-muted-foreground text-sm pt-4">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                {getFeatureIcon(feature)}
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex-grow" />

        {vehicle.price && (
            <p className="text-2xl font-bold text-foreground mt-4">{vehicle.price}</p>
        )}
        
        <Button asChild size="lg" className="w-full mt-4 font-semibold">
            <Link href="#booking">Забронировать</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export function Fleet() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
    <section id="fleet" className="py-20 md:py-28 bg-muted/20">
      <div className="container">
        <div className="text-center">
          <div className="animate-in fade-in-0 slide-in-from-top-8 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Хиты нашего автопарка</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Откройте для себя автомобили, которые наши клиенты выбирают чаще всего. Эти модели — идеальное сочетание комфорта, стиля и надежности, проверенное сотнями поездок по дорогам Узбекистана.
            </p>
          </div>
          <div className="w-full max-w-6xl mx-auto mt-12 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200">
              <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                  <CarouselContent>
                      {popularVehicles.map(vehicle => (
                          <CarouselItem key={vehicle.id} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-2 h-full">
                                  <VehicleCard vehicleId={vehicle.id} />
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
                          aria-label={`Перейти к слайду ${index + 1}`}
                          className={cn(
                              "h-2 w-2 rounded-full transition-all duration-300",
                              current === index ? 'w-4 bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                          )}
                      />
                  ))}
              </div>
          </div>
          
          <div className="mt-20 text-center border-t pt-16 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-300">
            <h3 className="text-2xl font-bold tracking-tight">Не нашли то, что искали?</h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Наш полный автопарк включает более 50 моделей. Мы подберем идеальный вариант для любой задачи — от деловой встречи до большого туристического тура.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="#">Посмотреть все модели</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold">
                <Link href="#booking">Связаться с нами</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
