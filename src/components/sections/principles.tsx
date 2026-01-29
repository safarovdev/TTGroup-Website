import { ShieldCheck, Clock, Award } from "lucide-react";

const principles = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Безопасность",
    description: "Наши водители — профессионалы с многолетним стажем. Все автомобили проходят регулярный техосмотр.",
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Пунктуальность",
    description: "Мы ценим ваше время. Подача автомобиля в строго оговоренное время — наш главный приоритет.",
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: "Профессионализм",
    description: "Индивидуальный подход к каждому клиенту, чистые салоны и вежливые водители, знающие города.",
  },
];

export function Principles() {
  return (
    <section id="services" className="bg-muted/50 py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">НАШИ ПРИНЦИПЫ</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            24/7. Надежность и комфорт в каждой поездке
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Мы не просто перевозим вас из точки А в точку Б. Мы заботимся о том, чтобы ваше путешествие было безопасным, своевременным и максимально комфортным.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <div key={i} className="text-center p-8 bg-card border rounded-2xl flex flex-col items-center shadow-lg">
              <div className="bg-primary/10 p-4 rounded-full">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mt-6">{p.title}</h3>
              <p className="text-muted-foreground mt-2">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
