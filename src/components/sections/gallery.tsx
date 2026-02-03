"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useOnScreen } from "@/hooks/use-on-screen";
import React from "react";
import { cn } from "@/lib/utils";

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith("gallery-"));

export function Gallery() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} id="gallery" className="py-20 md:py-28 bg-muted/20 border-t">
      <div className="container">
        <div className={cn("text-center max-w-4xl mx-auto mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary uppercase">
            Узбекистан из окна комфортного авто
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Это не просто фотографии — это реальные кадры из поездок наших клиентов. Посмотрите, каким может быть ваше путешествие: комфортабельные автомобили, живописные маршруты и остановки в самых красивых местах. <span className="font-semibold text-foreground">Вдохновитесь на свою следующую поездку.</span>
          </p>
          <Button asChild size="lg" className="mt-8 bg-[#E1306C] hover:bg-[#c13584] text-white font-bold">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Больше фото в <Instagram className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className={cn("columns-2 md:columns-3 gap-4 space-y-4", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-1000 delay-300" : "opacity-0")}>
          {galleryImages.map((image) => {
            return (
              <div key={image.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={500}
                  height={700}
                  className="w-full h-auto object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
