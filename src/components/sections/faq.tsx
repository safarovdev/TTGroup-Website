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

const faqItems = [
  {
    question: "Какие автомобили есть в вашем автопарке?",
    answer:
      "Наш автопарк включает более 50 автомобилей различных классов: от стандартных седанов (Chevrolet Cobalt, Kia K5) до премиальных внедорожников (LiXiang L7, Chevrolet Tahoe) и вместительных минивэнов и автобусов (Hyundai Staria, Mercedes-Benz Sprinter, Yutong). Мы подберем транспорт под любую задачу.",
  },
  {
    question: "Как забронировать автомобиль?",
    answer:
      "Вы можете забронировать автомобиль, заполнив форму на нашем сайте. Укажите ваше имя, номер телефона, желаемую дату и автомобиль. Наш менеджер свяжется с вами в ближайшее время для подтверждения и уточнения деталей. Вы также можете связаться с нами напрямую по телефону или через Telegram.",
  },
  {
    question: "Предоставляете ли вы услуги трансфера из/в аэропорт?",
    answer:
      "Да, мы предоставляем полный спектр услуг по трансферу из аэропортов Ташкента, Самарканда, Бухары и других городов Узбекистана. Наши водители встретят вас с табличкой, помогут с багажом и обеспечат комфортную поездку до вашего отеля или любого другого пункта назначения.",
  },
  {
      question: "Можно ли заказать автомобиль с водителем для поездки между городами?",
      answer:
        "Конечно. Мы специализируемся на междугородних перевозках по всему Узбекистану. Все наши автомобили оборудованы для комфортных дальних поездок, а водители имеют большой опыт вождения на длинные дистанции и отлично знают маршруты.",
  },
  {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем различные способы оплаты, включая наличные (узбекские сумы, доллары США), оплату банковской картой через терминал, а также банковские переводы для юридических лиц. Пожалуйста, уточните предпочтительный способ оплаты при бронировании."
  }
];

export function Faq() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
  const faqImage = PlaceHolderImages.find((img) => img.id === "faq-image");
  
  return (
    <section ref={ref} id="faq" className="py-20 md:py-28 bg-muted/50 border-t">
      <div className="container">
         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {faqImage && (
              <div className={cn("relative w-full aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl opacity-0", isVisible && "animate-in fade-in-0 zoom-in-95 duration-700")}>
                  <Image 
                      src={faqImage.imageUrl}
                      alt={faqImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={faqImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>
          )}
          <div className={cn("space-y-8 opacity-0", isVisible && "animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-200")}>
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Частые вопросы</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                  Ответы на самые популярные вопросы о наших услугах.
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
