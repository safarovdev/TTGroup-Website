"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { type Vehicle } from "@/lib/vehicles";

export const VehicleCard = ({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);
  
  if (!vehicle) return null;

  const finalImageUrl = vehicle.imageUrls?.[0] || "/images/placeholder.jpg";
  
  return (
    <Card className="overflow-hidden border transition-colors duration-300 flex flex-col bg-card h-full group hover:border-primary shadow-none">
        <Link href={`/fleet/${vehicle.id}`} className="flex flex-col h-full">
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
                            "object-cover transition-all duration-300 group-hover:scale-105",
                            isLoading ? "opacity-0" : "opacity-100"
                        )}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{t(`vehicleCategories.${vehicle.category}`)}</p>
                <CardTitle className="text-xl font-bold mt-1">{vehicle.name}</CardTitle>
                
                <div className="flex items-center gap-4 text-muted-foreground text-sm pt-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{t('vehicleDetail.capacity', { count: vehicle.capacity })}</span>
                    </div>
                </div>

                <div className="flex-grow" />

                <div className="mt-4">
                    {vehicle.price && vehicle.price > 0 ? (
                        <p className="text-2xl font-bold text-foreground">{t('vehicleDetail.priceLabel', { price: vehicle.price })}</p>
                    ) : (
                        <p className="text-lg font-bold text-foreground">{t('vehicleDetail.negotiablePrice')}</p>
                    )}
                </div>
                
                <Button size="lg" className="w-full mt-4 font-semibold">
                    {t('fleet.viewDetailsButton')}
                </Button>
            </CardContent>
        </Link>
    </Card>
  );
};
