"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-lixiang-l7");

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-start text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover -z-10"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 text-left">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter !leading-tight drop-shadow-lg">
            Ваш путь по Узбекистану начинается здесь
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
            Профессиональные пассажирские перевозки: от индивидуальных встреч в аэропорту до групповых туров.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap justify-start w-full">
            <Button asChild size="lg">
              <Link href="#booking">
                Забронировать <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#fleet">Наш автопарк</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}