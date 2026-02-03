"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useOnScreen } from "@/hooks/use-on-screen";
import { cn } from "@/lib/utils";

export function Principles() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });

  const topImage = PlaceHolderImages.find((img) => img.id === "location-samarkand");
  const bottomImage = PlaceHolderImages.find((img) => img.id === "location-bukhara");

  const stats = [
    { text: "Премиальные автомобили" },
    { text: "Водители с безупречным сервисом" },
    { text: "Трансферы, встречи, индивидуальные маршруты" },
  ];

  return (
    <section ref={ref} id="about" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className={cn("relative h-96 lg:h-[500px]", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-700" : "opacity-0")}>
            {bottomImage && (
              <div className="absolute bottom-0 left-0 w-[65%] h-[65%] md:w-[480px] md:h-[320px] rounded-md shadow-2xl overflow-hidden">
                <Image
                  src={bottomImage.imageUrl}
                  alt={bottomImage.description}
                  data-ai-hint={bottomImage.imageHint}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 65vw, 480px"
                />
              </div>
            )}
            {topImage && (
              <div className="absolute top-0 right-0 w-[55%] h-[55%] md:w-[360px] md:h-[240px] rounded-md shadow-2xl overflow-hidden border-8 border-background">
                <Image
                  src={topImage.imageUrl}
                  alt={topImage.description}
                  data-ai-hint={topImage.imageHint}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 360px"
                />
              </div>
            )}
          </div>

          <div className={cn("space-y-8", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-200" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Добро пожаловать в TourEast Transport Group
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
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
                    <div key={index} className="flex flex-col text-center h-full">
                        <p className="font-semibold text-foreground uppercase text-sm tracking-wider flex-grow flex items-center justify-center min-h-[3em]">{stat.text}</p>
                        <div className="w-1/4 h-0.5 bg-primary/30 mx-auto mt-3"></div>
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
