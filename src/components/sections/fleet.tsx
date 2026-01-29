import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plane, Users, Wind, MapPin, Sofa } from "lucide-react";
import Link from "next/link";

const vehicles = [
  {
    id: "fleet-lixiang-l7",
    name: "LiXiang L7",
    features: [
      { icon: <Plane className="w-5 h-5 text-primary" />, text: "Встреча (Аэропорт/Вокзал)" },
      { icon: <MapPin className="w-5 h-5 text-primary" />, text: "Экскурсии по городу" },
      { icon: <Sofa className="w-5 h-5 text-primary" />, text: "Комфорт (панорама, оттоманка)" },
    ],
    capacity: { icon: <Users className="w-5 h-5 text-primary" />, text: "до 4 пассажиров" },
  },
  {
    id: "fleet-mercedes-v",
    name: "Mercedes-Benz V-Class",
    features: [
      { icon: <Plane className="w-5 h-5 text-primary" />, text: "Трансферы для групп" },
      { icon: <Wind className="w-5 h-5 text-primary" />, text: "Климат-контроль" },
      { icon: <Sofa className="w-5 h-5 text-primary" />, text: "Кожаный салон" },
    ],
    capacity: { icon: <Users className="w-5 h-5 text-primary" />, text: "до 7 пассажиров" },
  },
  {
    id: "fleet-hyundai-h1",
    name: "Hyundai H1",
    features: [
      { icon: <Plane className="w-5 h-5 text-primary" />, text: "Вместительные поездки" },
      { icon: <Wind className="w-5 h-5 text-primary" />, text: "Кондиционер" },
      { icon: <MapPin className="w-5 h-5 text-primary" />, text: "Туры по региону" },
    ],
    capacity: { icon: <Users className="w-5 h-5 text-primary" />, text: "до 8 пассажиров" },
  },
  {
    id: "fleet-toyota-hiace",
    name: "Toyota Hiace",
    features: [
      { icon: <Plane className="w-5 h-5 text-primary" />, text: "Большие группы" },
      { icon: <Wind className="w-5 h-5 text-primary" />, text: "Надежность и простор" },
      { icon: <MapPin className="w-5 h-5 text-primary" />, text: "Длительные поездки" },
    ],
    capacity: { icon: <Users className="w-5 h-5 text-primary" />, text: "до 12 пассажиров" },
  },
];

const FeatureItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-center gap-3">
    {icon}
    <span className="text-sm text-muted-foreground">{text}</span>
  </li>
);

export function Fleet() {
  return (
    <section id="fleet" className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Наш автопарк</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Выберите идеальный автомобиль для вашей поездки — от премиальных внедорожников до вместительных минивэнов.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {vehicles.map((vehicle) => {
          const image = PlaceHolderImages.find((img) => img.id === vehicle.id);
          return (
            <Card key={vehicle.id} className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {image && (
                <div className="relative h-48">
                  <Image
                    src={image.imageUrl}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {vehicle.features.map((feature, index) => (
                    <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                  ))}
                  <FeatureItem icon={vehicle.capacity.icon} text={vehicle.capacity.text} />
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="#booking">Выбрать этот авто</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
