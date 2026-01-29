import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-lixiang-l7");

  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
      <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter !leading-tight">
          Ваш путь по Узбекистану начинается здесь
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
          Профессиональные пассажирские перевозки: от индивидуальных встреч в аэропорту до групповых туров.
        </p>
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start w-full">
          <Button asChild size="lg">
            <Link href="#booking">
              Забронировать <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#fleet">Наш автопарк</Link>
          </Button>
        </div>
      </div>
      <div className="relative group">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width={1200}
            height={800}
            className="rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
      </div>
    </section>
  );
}
