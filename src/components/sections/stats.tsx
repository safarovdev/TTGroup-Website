import { Briefcase, Users, Calendar, Clock } from "lucide-react";

const stats = [
    { value: "50+", label: "автомобилей в парке" },
    { value: "3-55", label: "посадочных мест" },
    { value: "2023-24", label: "средний год выпуска авто" },
    { value: "15 мин", label: "подача в Бухаре" },
];

export function Stats() {
    return (
        <section id="stats" className="py-20 md:py-28 bg-muted/50 border-y">
            <div className="container">
                 <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">TTGroup в цифрах</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Наша надежность и качество, подтвержденные фактами.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center bg-card p-6 rounded-lg shadow-sm">
                            <p className="text-4xl md:text-5xl font-extrabold text-primary">{stat.value}</p>
                            <p className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
