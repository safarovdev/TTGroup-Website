import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Cog, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const tripScenarios = [
  {
    value: "business",
    title: "Бизнес и VIP",
    description: "Для деловых встреч и статусных гостей.",
    vehicle_ids: ["fleet-lixiang-l7", "fleet-mercedes-s500", "fleet-chevrolet-tahoe"]
  },
  {
    value: "family",
    title: "Семейные путешествия",
    description: "Комфорт для всей семьи на дальние расстояния.",
    vehicle_ids: ["fleet-kia-carnival", "fleet-hyundai-staria"]
  },
  {
    value: "groups",
    title: "Для больших групп",
    description: "Экскурсии и корпоративные выезды.",
    vehicle_ids: ["fleet-yutong-bus", "fleet-mercedes-sprinter"]
  },
  {
    value: "economy",
    title: "Эконом и Город",
    description: "Быстро и доступно для поездок по городу.",
    vehicle_ids: ["fleet-chevrolet-cobalt", "fleet-chevrolet-malibu"]
  }
];

const popular_ids = ["fleet-lixiang-l7", "fleet-kia-k5", "fleet-hyundai-staria"];
const popularVehicles = popular_ids
  .map(id => PlaceHolderImages.find(v => v.id === id))
  .filter((v): v is NonNullable<typeof v> => v !== undefined);

const VehicleCard = ({ vehicleId }: { vehicleId: string }) => {
  const vehicle = PlaceHolderImages.find(v => v.id === vehicleId);
  if (!vehicle) return null;
  
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
      <CardContent className="p-6 flex-grow flex flex-col gap-4">
        <CardTitle className="text-xl font-bold">{vehicle.name}</CardTitle>
        
        {vehicle.specs && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 text-muted-foreground text-sm pt-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{vehicle.specs.seats}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>{vehicle.specs.luggage}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="w-4 h-4 text-primary" />
              <span>{vehicle.specs.transmission}</span>
            </div>
          </div>
        )}

        <div className="flex-grow" />

        {vehicle.price && (
            <p className="text-2xl font-bold text-foreground">{vehicle.price}</p>
        )}
        
        <Button asChild size="lg" className="w-full mt-2 font-semibold">
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
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Подборки по сценарию поездки</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Выберите цель поездки, и мы предложим лучшие варианты.
          </p>
        </div>

        <Tabs defaultValue={tripScenarios[0].value} className="w-full max-w-5xl mx-auto mt-12">
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
