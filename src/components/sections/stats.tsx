import { Briefcase, Users, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const parkStat = { value: "50+", label: "автомобилей в парке", icon: <Briefcase className="w-6 h-6 text-primary" /> };
const seatsStat = { value: "3-55", label: "посадочных мест", icon: <Users className="w-6 h-6 text-primary" /> };
const yearStat = { value: "2023-24", label: "средний год выпуска авто", icon: <Calendar className="w-6 h-6 text-primary" /> };
const dispatchStat = { value: "15 мин", label: "среднее время подачи", icon: <Clock className="w-6 h-6 text-primary" /> };

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
    const statsImage = PlaceHolderImages.find((img) => img.id === "stats-background");

    return (
        <section id="stats" className="py-20 md:py-28 bg-muted/50 border-y">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">TTGroup в цифрах</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Наша надежность и качество, подтвержденные фактами.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Mobile Layout */}
                    <div className="flex flex-col items-center gap-8 lg:hidden">
                        <Card className="shadow-xl rounded-2xl w-full max-w-sm">
                             <CardContent className="p-6 space-y-5">
                                <StatItem stat={parkStat} />
                                <Separator />
                                <StatItem stat={seatsStat} />
                            </CardContent>
                        </Card>
                         <Card className="shadow-xl rounded-2xl w-full max-w-sm">
                            <CardContent className="p-6 space-y-5">
                                <StatItem stat={yearStat} />
                                <Separator />
                                <StatItem stat={dispatchStat} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block min-h-[30rem] relative">
                         {statsImage && (
                            <div className="absolute w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Image
                                    src={statsImage.imageUrl}
                                    alt={statsImage.description}
                                    width={448}
                                    height={448}
                                    className="object-contain"
                                    data-ai-hint={statsImage.imageHint}
                                />
                            </div>
                        )}
                         <Card className="absolute bottom-8 left-0 w-80 shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm">
                             <CardContent className="p-6 space-y-5">
                                <StatItem stat={parkStat} />
                                <Separator />
                                <StatItem stat={seatsStat} />
                            </CardContent>
                        </Card>
                         <Card className="absolute top-8 right-0 w-80 shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-5">
                                <StatItem stat={yearStat} />
                                <Separator />
                                <StatItem stat={dispatchStat} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}