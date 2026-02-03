"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 text-amber-500">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : ''}`} />
    ))}
  </div>
);

export function Testimonials() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
  const { t } = useTranslation();

  const testimonialsData = [
    {
      name: t('testimonials.items.t1.name'),
      role: t('testimonials.items.t1.role'),
      avatar: 'АП',
      rating: 5,
      quote: t('testimonials.items.t1.quote')
    },
    {
      name: t('testimonials.items.t2.name'),
      role: t('testimonials.items.t2.role'),
      avatar: 'МК',
      rating: 5,
      quote: t('testimonials.items.t2.quote')
    },
    {
      name: 'John S.',
      role: t('testimonials.items.t3.role'),
      avatar: 'JS',
      rating: 5,
      quote: t('testimonials.items.t3.quote')
    }
  ];

  return (
    <section ref={ref} id="testimonials" className="py-20 md:py-28 bg-background border-t">
      <div className="container">
        <div className={cn("max-w-4xl mx-auto text-center mb-16", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase !leading-tight">
                <span className="block text-muted-foreground/80">{t('testimonials.title.line1')}</span>
                <span className="block text-primary">{t('testimonials.title.line2')}</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                {t('testimonials.description')}
            </p>
        </div>
        
        <div className={cn("grid lg:grid-cols-3 gap-12 items-start", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
            {/* Left column: Testimonials */}
            <div className="lg:col-span-2 space-y-8">
                {testimonialsData.map((testimonial, index) => (
                    <Card key={index} className="shadow-none bg-muted/30">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                                <Avatar className="w-12 h-12 border-2 border-primary/20">
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-bold text-lg">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                        <Rating rating={testimonial.rating} />
                                    </div>
                                    <blockquote className="text-foreground/90 mt-4 text-base">
                                        {testimonial.quote}
                                    </blockquote>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Right column: Links to maps */}
            <div>
                <Card className="bg-muted/50 p-8 text-center shadow-none">
                     <h3 className="text-2xl font-bold mb-4">{t('testimonials.feedback.title')}</h3>
                     <p className="text-muted-foreground mb-8">
                        {t('testimonials.feedback.description')}
                     </p>
                     <div className="flex flex-col gap-4">
                        <Button asChild variant="secondary" size="lg" className="w-full h-16 text-base font-semibold">
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path d="M12.005 1.25A8.505 8.505 0 003.5 9.755c0 6.13 8.505 13 8.505 13s8.505-6.87 8.505-13a8.505 8.505 0 00-8.505-8.505zm0 11.41a2.905 2.905 0 110-5.81 2.905 2.905 0 010 5.81z"/>
                                </svg>
                                <span>{t('testimonials.feedback.google')}</span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg" className="w-full h-16 text-base font-semibold">
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path d="M12 3c-4.42 0-8 3.58-8 8s8 11 8 11 8-7.58 8-11-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 7.5 12 7.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                                </svg>
                                 <span>{t('testimonials.feedback.yandex')}</span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg" className="w-full h-16 text-base font-semibold">
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.63 8 12 8 12s8-6.37 8-12C20 5.58 16.42 2 12 2zm-1.5 11h3c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5H11v-1h2.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3a.5.5 0 0 0-.5.5v3c0 .28.22.5.5.5z"/>
                                </svg>
                                 <span>{t('testimonials.feedback.gis')}</span>
                            </Link>
                        </Button>
                     </div>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
