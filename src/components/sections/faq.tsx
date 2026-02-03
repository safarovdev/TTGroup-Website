"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React from "react";
import { useOnScreen } from "@/hooks/use-on-screen";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function Faq() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
  const faqImage = PlaceHolderImages.find((img) => img.id === "faq-image");
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t('faq.items.q1'),
      answer: t('faq.items.a1'),
    },
    {
      question: t('faq.items.q2'),
      answer: t('faq.items.a2'),
    },
    {
      question: t('faq.items.q3'),
      answer: t('faq.items.a3'),
    },
    {
      question: t('faq.items.q4'),
      answer: t('faq.items.a4'),
    },
    {
      question: t('faq.items.q5'),
      answer: t('faq.items.a5'),
    }
  ];
  
  return (
    <section ref={ref} id="faq" className="py-20 md:py-28 bg-muted/50 border-t">
      <div className="container">
         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {faqImage && (
              <div className={cn("relative w-full aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl", isVisible ? "animate-in fade-in-0 zoom-in-95 duration-700" : "opacity-0")}>
                  <Image 
                      src={faqImage.imageUrl}
                      alt={t(faqImage.descriptionKey)}
                      fill
                      className="object-cover"
                      data-ai-hint={faqImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>
          )}
          <div className={cn("space-y-8", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-200" : "opacity-0")}>
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('faq.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                  {t('faq.description')}
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold text-lg">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">
                       {item.answer}
                      </AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
         </div>
      </div>
    </section>
  );
}
