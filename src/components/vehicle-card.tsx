"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Briefcase, Users, Star, Sun, Zap, Armchair, Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { type Vehicle } from "@/lib/vehicles";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);
  
  if (!vehicle) return null;

  const finalImageUrl = vehicle.imageUrl || "/images/placeholder.jpg";
  
  const featureIcons: { [key: string]: React.ReactElement } = {
    'мест': <Users />,
    'seats': <Users />,
    'пассажир': <Users />,
    'passenger': <Users />,
    'салон': <Armchair />,
    'leather': <Armchair />,
    'панорама': <Sun />,
    'panorama': <Sun />,
    'электро': <Zap />,
    'electric': <Zap />,
    'внедорожник': <Car />,
    'suv': <Car />,
    'кроссовер': <Car />,
    'crossover': <Car />,
    'vip': <Star />,
    'бизнес': <Briefcase />,
    'business': <Briefcase />,
    'кресла': <Armchair />,
    'captain': <Armchair />,
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
        
        {vehicle.featureKeys && (
          <ul className="space-y-2 text-muted-foreground text-sm pt-4">
            {vehicle.featureKeys.map((featureKey, index) => (
              <li key={index} className="flex items-center gap-3">
                {getFeatureIcon(t(`vehicleFeatures.${featureKey}`))}
                <span>{t(`vehicleFeatures.${featureKey}`)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex-grow" />

        {vehicle.priceKey && (
            <p className="text-2xl font-bold text-foreground mt-4">{t(`vehiclePrices.${vehicle.priceKey}`)}</p>
        )}
        
        <Button asChild size="lg" className="w-full mt-4 font-semibold">
            <Link href="/#booking">{t('fleet.bookButton')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
