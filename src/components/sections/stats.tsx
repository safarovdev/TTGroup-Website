"use client";

import { Briefcase, Users, Calendar, Clock, Smile, MapPin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useOnScreen } from "@/hooks/use-on-screen";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

const StatItem = ({ stat }: { stat: { value: string; label: string; icon: React.ReactNode } }) => (
    <div className="flex items-center gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
            {stat.icon}
        </div>
        <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
    </div>
);

export function Stats() {
    const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
    const { t } = useTranslation();
    const statsImage = PlaceHolderImages.find((img) => img.id === "stats-background");

    const parkStat = { value: "50+", label: t('stats.park'), icon: <Briefcase className="w-6 h-6 text-primary" /> };
    const seatsStat = { value: "3-55", label: t('stats.seats'), icon: <Users className="w-6 h-6 text-primary" /> };
    const clientsStat = { value: "1000+", label: t('stats.clients'), icon: <Smile className="w-6 h-6 text-primary" /> };

    const yearStat = { value: "2023-24", label: t('stats.year'), icon: <Calendar className="w-6 h-6 text-primary" /> };
    const dispatchStat = { value: "15 min", label: t('stats.dispatch'), icon: <Clock className="w-6 h-6 text-primary" /> };
    const citiesStat = { value: "12+", label: t('stats.cities'), icon: <MapPin className="w-6 h-6 text-primary" /> };

    return (
        <section ref={ref} id="stats" className="py-20 md:py-28 bg-muted/50 border-y">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Text */}
                    <div className={cn("space-y-8 text-center lg:text-left", isVisible ? "animate-in fade-in-0 slide-in-from-left-10 duration-700" : "opacity-0")}>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('stats.title')}</h2>
                        <p className="text-xl text-muted-foreground">
                            {t('stats.description1')}
                        </p>
                        <p className="text-lg text-muted-foreground">
                           {t('stats.description2')}
                        </p>
                    </div>

                    {/* Right Column: Visualization */}
                    <div className={cn("relative", isVisible ? "animate-in fade-in-0 slide-in-from-right-10 duration-700 delay-200" : "opacity-0")}>
                        {/* Mobile Layout */}
                        <div className="flex flex-col items-center gap-8 lg:hidden">
                            <Card className="shadow-xl rounded-2xl w-full max-w-sm">
                                 <CardContent className="p-6 space-y-5">
                                    <StatItem stat={parkStat} />
                                    <Separator />
                                    <StatItem stat={seatsStat} />
                                    <Separator />
                                    <StatItem stat={clientsStat} />
                                </CardContent>
                            </Card>
                             <Card className="shadow-xl rounded-2xl w-full max-w-sm">
                                <CardContent className="p-6 space-y-5">
                                    <StatItem stat={yearStat} />
                                    <Separator />
                                    <StatItem stat={dispatchStat} />
                                    <Separator />
                                    <StatItem stat={citiesStat} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden lg:block min-h-[34rem] relative">
                             {statsImage && (
                                <div className="absolute w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Image
                                        src={statsImage.imageUrl}
                                        alt={t(statsImage.descriptionKey)}
                                        width={448}
                                        height={448}
                                        className="object-contain"
                                        data-ai-hint={statsImage.imageHint}
                                    />
                                </div>
                            )}
                             <Card className="absolute bottom-0 left-0 w-80 shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm">
                                 <CardContent className="p-8 space-y-6">
                                    <StatItem stat={parkStat} />
                                    <Separator />
                                    <StatItem stat={seatsStat} />
                                    <Separator />
                                    <StatItem stat={clientsStat} />
                                 </CardContent>
                            </Card>
                             <Card className="absolute top-0 right-0 w-80 shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm">
                                <CardContent className="p-8 space-y-6">
                                    <StatItem stat={yearStat} />
                                    <Separator />
                                    <StatItem stat={dispatchStat} />
                                    <Separator />
                                    <StatItem stat={citiesStat} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
