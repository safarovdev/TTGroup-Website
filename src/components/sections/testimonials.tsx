"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/50 border-t">
      <div className="container text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase !leading-tight">
          <span className="block text-muted-foreground/80">Они уже открыли</span>
          <span className="block text-primary">Центральную Азию</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Что говорят о нас те, кто уже доверил нам свои путешествия? Посмотрите реальные отзывы и оценки нашего сервиса на популярных площадках.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Google Карты</CardTitle>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-lg text-foreground">5.0</span>
                </div>
              </div>
              <CardDescription>Более 50 реальных отзывов</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="text-muted-foreground mb-6 border-l-2 pl-4 italic">
                "Отличный сервис, новые машины, вежливые водители. Безусловно рекомендую!"
              </blockquote>
              <Button asChild className="w-full">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  Читать на Google <MapPin className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
               <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Яндекс Карты</CardTitle>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-lg text-foreground">4.9</span>
                </div>
              </div>
              <CardDescription>Более 30 проверенных оценок</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="text-muted-foreground mb-6 border-l-2 pl-4 italic">
                "Помогли с организацией трансфера для большой группы. Все четко, вовремя и на высшем уровне."
              </blockquote>
              <Button asChild className="w-full">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                   Читать на Яндексе <MapPin className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
