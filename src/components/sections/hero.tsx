"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-lixiang-l7");
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-start text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={t(heroImage.descriptionKey)}
          fill
          className="object-cover object-right md:object-center -z-10"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="container relative z-10 text-left">
        <div className="max-w-2xl animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 ease-out">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter !leading-tight drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex gap-4 flex-wrap justify-start w-full">
            <Button asChild size="lg">
              <Link href="#booking">
                {t('hero.bookButton')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#fleet-intro">{t('hero.fleetButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
