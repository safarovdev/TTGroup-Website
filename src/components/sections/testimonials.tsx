"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonialsData = [
  {
    name: 'Алексей П.',
    role: 'Бизнес-поездка',
    avatar: 'АП',
    rating: 5,
    quote: "Отличный сервис, новые машины, вежливые водители. Заказывал трансфер для партнеров — все остались очень довольны. Безусловно рекомендую!"
  },
  {
    name: 'Мария К.',
    role: 'Организатор конференции',
    avatar: 'МК',
    rating: 5,
    quote: "Помогли с организацией трансфера для большой группы. Все четко, вовремя и на высшем уровне. Машины чистые, водители профессионалы."
  },
  {
    name: 'John S.',
    role: 'Турист из США',
    avatar: 'JS',
    rating: 5,
    quote: "The best airport transfer I've had. The driver met me with a sign, helped with luggage. The car was perfectly clean. Great start to my trip in Uzbekistan!"
  }
];

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 text-amber-500">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : ''}`} />
    ))}
  </div>
);

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background border-t">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase !leading-tight">
                <span className="block text-muted-foreground/80">Сервис, которому</span>
                <span className="block text-primary">Доверяют</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Мы гордимся высоким уровнем нашего сервиса. Узнайте, что говорят клиенты, которые уже воспользовались нашими услугами.
            </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left column: Testimonials */}
            <div className="lg:col-span-2 space-y-8">
                {testimonialsData.map((testimonial, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-muted/30">
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
            <div className="lg:sticky lg:top-24">
                <Card className="bg-muted/50 p-8 text-center shadow-xl border-0">
                     <h3 className="text-2xl font-bold mb-4">Ваше мнение важно</h3>
                     <p className="text-muted-foreground mb-8">
                        Мы ценим каждый отзыв. Ознакомьтесь с десятками реальных оценок на популярных платформах.
                     </p>
                     <div className="flex flex-col gap-4">
                        <Button asChild variant="secondary" size="lg" className="justify-between w-full h-14 text-base">
                            <Link href="#" target="_blank" rel="noopener noreferrer">
                                <span>Google Карты</span>
                                <span className="flex items-center gap-1 bg-black/10 px-3 py-1 rounded-md">
                                    5.0 <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg" className="justify-between w-full h-14 text-base">
                            <Link href="#" target="_blank" rel="noopener noreferrer">
                                <span>Яндекс Карты</span>
                                 <span className="flex items-center gap-1 bg-black/10 px-3 py-1 rounded-md">
                                    4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                                </span>
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
