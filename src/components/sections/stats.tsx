import { Briefcase, Users, Calendar, Clock, Smile, MapPin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const parkStat = { value: "50+", label: "автомобилей в парке", icon: <Briefcase className="w-6 h-6 text-primary" /> };
const seatsStat = { value: "3-55", label: "посадочных мест", icon: <Users className="w-6 h-6 text-primary" /> };
const clientsStat = { value: "1000+", label: "довольных клиентов", icon: <Smile className="w-6 h-6 text-primary" /> };

const yearStat = { value: "2023-24", label: "средний год выпуска авто", icon: <Calendar className="w-6 h-6 text-primary" /> };
const dispatchStat = { value: "15 мин", label: "среднее время подачи", icon: <Clock className="w-6 h-6 text-primary" /> };
const citiesStat = { value: "12+", label: "городов по Узбекистану", icon: <MapPin className="w-6 h-6 text-primary" /> };


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
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Text */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">TTGroup в цифрах</h2>
                        <p className="text-lg text-muted-foreground">
                            Наша надежность и качество, подтвержденные фактами. Мы гордимся нашим сервисом и предлагаем вам лучшие условия для комфортных и безопасных поездок.
                        </p>
                        <p className="text-muted-foreground">
                           Наш автопарк постоянно обновляется, водители проходят строгий отбор, а география наших услуг покрывает все популярные туристические и деловые направления в Узбекистане.
                        </p>
                    </div>

                    {/* Right Column: Visualization */}
                    <div className="relative">
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
                                        alt={statsImage.description}
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
