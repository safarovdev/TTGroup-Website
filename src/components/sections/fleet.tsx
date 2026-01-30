import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
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
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-xl font-bold flex-grow">{vehicle.name}</CardTitle>
        <Button asChild variant="link" className="p-0 h-auto mt-2 text-primary font-semibold self-start">
            <Link href="#booking">Забронировать <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
                            <div className="p-2">
                                <VehicleCard vehicleId={vehicle.id} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-14" />
                <CarouselNext className="mr-14" />
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
              <TabsTrigger key={scenario.value} value={scenario.value} className="py-3 text-sm font-semibold">
                {scenario.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tripScenarios.map((scenario) => (
            <TabsContent key={scenario.value} value={scenario.value} className="mt-8">
              <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">{scenario.description}</p>
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
