"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Calendar, Snowflake, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vehicles } from '@/lib/vehicles';
import { Card, CardContent } from '@/components/ui/card';

const fleetCategories = [
    { 
        name: 'Премиум & VIP', 
        description: 'Для деловых встреч и гостей, ценящих эксклюзивный комфорт.',
        vehicleId: 'fleet-lixiang-l7' 
    },
    { 
        name: 'Комфорт & Стандарт', 
        description: 'Оптимальный выбор для ежедневных поездок и туров по городу.',
        vehicleId: 'fleet-kia-k5' 
    },
    { 
        name: 'Минивэны', 
        description: 'Идеально для семейных путешествий и небольших делегаций.',
        vehicleId: 'fleet-hyundai-staria'
    },
    { 
        name: 'Автобусы', 
        description: 'Решения для корпоративных выездов, экскурсий и больших групп.',
        vehicleId: 'fleet-mercedes-sprinter'
    },
];

const standards = [
    { 
        icon: <Calendar className="w-8 h-8" />, 
        title: "Свежий автопарк", 
        description: "90% нашего парка — это автомобили 2023–2024 годов выпуска в идеальном техническом и внешнем состоянии." 
    },
    { 
        icon: <Sparkles className="w-8 h-8" />, 
        title: "Идеальная чистота", 
        description: "Мы проводим комплексную мойку и химчистку салона перед каждой поездкой. В наших машинах не курят." 
    },
    { 
        icon: <Snowflake className="w-8 h-8" />, 
        title: "Комфорт в любую погоду", 
        description: "Все автомобили оснащены исправными системами климат-контроля, гарантируя прохладу даже в +40°C." 
    },
    { 
        icon: <ShieldCheck className="w-8 h-8" />, 
        title: "Безопасность превыше всего", 
        description: "Регулярный техосмотр, полное страхование и только опытные водители со стажем более 10 лет."
    },
];

export function FleetIntro() {
    const [activeCategoryId, setActiveCategoryId] = useState(fleetCategories[0].vehicleId);

    const activeVehicle = useMemo(() => {
        return Vehicles.find(v => v.id === activeCategoryId) || Vehicles.find(v => v.id === fleetCategories[0].vehicleId);
    }, [activeCategoryId]);
    
    const imageUrl = activeVehicle?.imageUrl || "/images/placeholder.jpg";

    return (
        <section id="fleet-intro" className="py-20 md:py-28 bg-muted/20 border-b">
            <div className="container">
                {/* 1. Headline */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Больше, чем просто транспорт. <span className="text-primary">Ваш личный флот</span> в Узбекистане.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                        От маневренных седанов для городских встреч до премиальных лайнеров для больших делегаций. Мы собрали лучший автопарк в регионе, чтобы каждая ваша поездка была безупречной.
                    </p>
                </div>

                {/* 2. Interactive Gallery */}
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-20 items-center">
                    {/* Left: Categories */}
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-4">
                            {fleetCategories.map(category => (
                                <button
                                    key={category.vehicleId}
                                    onMouseEnter={() => setActiveCategoryId(category.vehicleId)}
                                    className={cn(
                                        'p-6 rounded-2xl text-left transition-all duration-300 border-2',
                                        activeCategoryId === category.vehicleId
                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                                            : 'bg-card hover:bg-card/80 border-transparent'
                                    )}
                                >
                                    <p className="font-bold text-xl">{category.name}</p>
                                    <p className={cn('text-sm mt-1', activeCategoryId === category.vehicleId ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{category.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="lg:col-span-8 relative aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            key={imageUrl}
                            src={imageUrl}
                            alt={activeVehicle?.name || 'Flagship vehicle'}
                            fill
                            className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            data-ai-hint={activeVehicle?.imageHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                         <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                            <p className="text-sm uppercase tracking-widest text-white/80">Флагман категории</p>
                            <h4 className="text-2xl md:text-4xl font-bold drop-shadow-md mt-1">{activeVehicle?.name}</h4>
                         </div>
                    </div>
                </div>

                {/* 3. Standards Block */}
                 <div className="mb-20">
                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                         {standards.map(standard => (
                            <Card key={standard.title} className="border-0 bg-transparent shadow-none">
                               <CardContent className="p-0 flex items-start gap-4">
                                 <div className="flex-shrink-0 mt-1 p-3 bg-primary/10 rounded-full text-primary">
                                     {standard.icon}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1">{standard.title}</h4>
                                     <p className="text-sm text-muted-foreground">{standard.description}</p>
                                 </div>
                               </CardContent>
                            </Card>
                         ))}
                     </div>
                 </div>

                {/* 4. SEO Block */}
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4">Для любых задач и маршрутов</h3>
                    <p className="text-lg text-muted-foreground">
                        Мы понимаем разницу между туристической прогулкой по Бухаре и официальным визитом делегации. Поэтому в TTGroup мы предлагаем гибкие решения: быстрый заказ седана за 15 минут, организацию логистики для конференций на автобусах Yutong или премиальное сопровождение на LiXiang L7. Весь транспорт оборудован для комфортных поездок на дальние дистанции между городами Узбекистана.
                    </p>
                </div>
            </div>
        </section>
    );
}
