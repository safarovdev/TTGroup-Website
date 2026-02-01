import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { ArrowRight, Briefcase, Users, Star, Sun, Zap, Armchair, Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const tripScenarios = [
  {
    value: "premium",
    title: "Премиум и VIP",
    description: "Для деловых встреч и самых взыскательных гостей.",
    vehicle_ids: ["fleet-lixiang-l7", "fleet-chevrolet-tahoe-rs", "fleet-mercedes-s500", "fleet-toyota-lc-200", "fleet-haval-h6", "fleet-haval-dargo", "fleet-byd-champion", "fleet-aiqar-eq7"]
  },
  {
    value: "comfort",
    title: "Комфорт и Стандарт",
    description: "Оптимальное сочетание цены и качества для любых поездок.",
    vehicle_ids: ["fleet-chevrolet-malibu-2", "fleet-kia-k5", "fleet-kia-sportage", "fleet-chevrolet-captiva-5", "fleet-chevrolet-cobalt", "fleet-jac-j7"]
  },
  {
    value: "minivans",
    title: "Минивэны",
    description: "Идеально для семейных путешествий и небольших групп.",
    vehicle_ids: ["fleet-hyundai-staria", "fleet-kia-carnival", "fleet-hyundai-starex", "fleet-kia-carens", "fleet-baw-m7", "fleet-jac-refine-m4", "fleet-mercedes-vito"]
  },
  {
    value: "buses",
    title: "Автобусы",
    description: "Для больших групп, экскурсий и корпоративных выездов.",
    vehicle_ids: ["fleet-mercedes-sprinter", "fleet-toyota-hiace", "fleet-foton-view-cs2", "fleet-joylong", "fleet-jac-sunray", "fleet-setra-minibus", "fleet-yutong-bus"]
  }
];

const popular_ids = ["fleet-lixiang-l7", "fleet-kia-k5", "fleet-hyundai-staria"];
const popularVehicles = popular_ids
  .map(id => PlaceHolderImages.find(v => v.id === id))
  .filter((v): v is NonNullable<typeof v> => v !== undefined);

const VehicleCard = ({ vehicleId }: { vehicleId: string }) => {
  const vehicle = PlaceHolderImages.find(v => v.id === vehicleId);
  if (!vehicle) return null;
  
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
            <Image
                src={vehicle.imageUrl}
                alt={vehicle.name}
                fill
                className="object-cover"
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
  return (
    <section id="fleet" className="py-20 md:py-28">
      <div className="container">
        <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Популярные модели</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Наши самые востребованные автомобили 2024 года, которые сочетают в себе комфорт, стиль и надежность.
                </p>
            </div>
            <Carousel opts={{ loop: true }} className="w-full max-w-6xl mx-auto mt-12">
                <CarouselContent>
                    {popularVehicles.map(vehicle => (
                        <CarouselItem key={vehicle.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-2 h-full">
                                <VehicleCard vehicleId={vehicle.id} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-12" />
                <CarouselNext className="-right-4 md:-right-12" />
            </Carousel>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Наш автопарк</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Выберите цель поездки, и мы предложим лучшие варианты.
          </p>
        </div>

        <Tabs defaultValue={tripScenarios[0].value} className="w-full max-w-6xl mx-auto mt-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto -mx-1">
            {tripScenarios.map((scenario) => (
              <TabsTrigger key={scenario.value} value={scenario.value} className="py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {scenario.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tripScenarios.map((scenario) => (
            <TabsContent key={scenario.value} value={scenario.value} className="mt-8">
              <p className="text-lg text-center text-muted-foreground mb-8 max-w-xl mx-auto">{scenario.description}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scenario.vehicle_ids.map((id) => (
                  <VehicleCard key={id} vehicleId={id} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
