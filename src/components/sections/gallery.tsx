"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useOnScreen } from "@/hooks/use-on-screen";
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith("gallery-"));

export function Gallery() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.1 });
  const { t } = useTranslation();

  return (
    <section ref={ref} id="gallery" className="py-20 md:py-28 bg-muted/20 border-t">
      <div className="container">
        <div className={cn("text-center max-w-4xl mx-auto mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary uppercase">
            {t('gallery.title')}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            <span dangerouslySetInnerHTML={{ __html: t('gallery.description') }} />
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <Link href="https://t.me/transport_uzbekistann" target="_blank" rel="noopener noreferrer">
              {t('gallery.telegramButton')} <MessageSquare className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className={cn("columns-2 md:columns-3 gap-4 space-y-4", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-1000 delay-300" : "opacity-0")}>
          {galleryImages.map((image) => {
            return (
              <div key={image.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background">
                <Image
                  src={image.imageUrl}
                  alt={t(image.descriptionKey)}
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
