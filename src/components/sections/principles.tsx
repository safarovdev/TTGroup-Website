import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Principles() {
  const topImage = PlaceHolderImages.find((img) => img.id === "location-samarkand");
  const bottomImage = PlaceHolderImages.find((img) => img.id === "location-bukhara");

  const stats = [
    {
      icon: '🚘',
      text: "Премиальные автомобили",
    },
    {
      icon: '👔',
      text: "Водители с безупречным сервисом",
    },
    {
      icon: '✈️',
      text: "Трансферы, встречи, индивидуальные маршруты",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-96 lg:h-[500px]">
            {bottomImage && (
              <Image
                src={bottomImage.imageUrl}
                alt={bottomImage.description}
                data-ai-hint={bottomImage.imageHint}
                width={480}
                height={320}
                className="object-cover shadow-2xl absolute bottom-0 left-0"
              />
            )}
            {topImage && (
               <Image
                src={topImage.imageUrl}
                alt={topImage.description}
                data-ai-hint={topImage.imageHint}
                width={360}
                height={240}
                className="object-cover shadow-2xl absolute top-0 right-0 border-8 border-background"
              />
            )}
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Добро пожаловать в TourEast Transport Group
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы создаём комфортные и безопасные поездки по всему Узбекистану — для тех, кто ценит уровень. TourEast Transport Group — ваш надёжный партнёр в мире премиальных перевозок.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button asChild size="lg" className="font-bold">
                 <Link href="#booking">Бронировать онлайн</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="font-bold">
                 <Link href="#booking">Связаться с нами</Link>
               </Button>
            </div>
             <div className="border-t pt-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <p className="font-semibold text-foreground uppercase text-sm tracking-wider">{stat.text}</p>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
