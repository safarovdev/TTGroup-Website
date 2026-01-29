import { Car, UserCheck, Plane } from "lucide-react";

const features = [
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    text: "Премиальные автомобили",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    text: "Водители с безупречным сервисом",
  },
  {
    icon: <Plane className="w-8 h-8 text-primary" />,
    text: "Трансферы, встречи, индивидуальные маршруты",
  },
];

export function Principles() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Добро пожаловать в TourEast Transport Group
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Мы создаём комфортные и безопасные поездки по всему Узбекистану — для тех, кто ценит уровень.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  {feature.icon}
                </div>
                <p className="font-semibold text-base">{feature.text}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-8">
             <p className="text-lg font-medium text-foreground">
                TourEast Transport Group — ваш надёжный партнёр в мире премиальных перевозок.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
