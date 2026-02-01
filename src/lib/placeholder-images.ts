export type ImagePlaceholder = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  features?: string[];
  price?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
  // Existing hero and about images
  {
    "id": "hero-lixiang-l7",
    "name": "LiXiang L7",
    "description": "Белый внедорожник на фоне горного пейзажа",
    "imageUrl": "/images/h-background.jpg",
    "imageHint": "suv mountains"
  },
  {
    "id": "location-bukhara",
    "name": "Bukhara",
    "description": "Ark of Bukhara fortress at sunset.",
    "imageUrl": "/images/about-1.jpg",
    "imageHint": "ancient fortress"
  },
  {
    "id": "location-samarkand",
    "name": "Samarkand",
    "description": "Registan square in Samarkand.",
    "imageUrl": "/images/about-2.jpg",      
    "imageHint": "historic square"
  },
  {
    "id": "stats-background",
    "name": "Abstract background for stats",
    "description": "Abstract colorful shapes background",
    "imageUrl": "/images/stats.jpg",
    "imageHint": "abstract colorful"
  },
  
  // Premium & VIP
  {
    "id": "fleet-lixiang-l7",
    "name": "LiXiang L7",
    "description": "Премиальный VIP-кроссовер с панорамной крышей.",
    "imageUrl": "https://picsum.photos/seed/lixiang-l7/800/600",
    "imageHint": "white suv interior",
    "features": ["до 4 мест", "Панорамная крыша", "Оттоманка", "VIP-класс"],
    "price": "от 120$ / день"
  },
  {
    "id": "fleet-chevrolet-tahoe-rs",
    "name": "Chevrolet Tahoe RS",
    "description": "Вместительный внедорожник премиум-класса.",
    "imageUrl": "https://picsum.photos/seed/tahoe-rs/800/600",
    "imageHint": "black suv city",
    "features": ["1–4 места", "Премиум-внедорожник", "Просторный салон"],
    "price": "от 140$ / день"
  },
  {
    "id": "fleet-mercedes-s500",
    "name": "Mercedes-Benz S500",
    "description": "Представительский седан с панорамной крышей.",
    "imageUrl": "https://picsum.photos/seed/mercedes-s500/800/600",
    "imageHint": "luxury black sedan",
    "features": ["до 3 мест", "Кожаный салон", "Панорамная крыша"],
    "price": "от 150$ / день"
  },
  {
    "id": "fleet-toyota-lc-200",
    "name": "Toyota Land Cruiser 200",
    "description": "Надежный и комфортный внедорожник.",
    "imageUrl": "https://picsum.photos/seed/lc-200/800/600",
    "imageHint": "white offroad suv",
    "features": ["1–4 места", "Полноприводный внедорожник"],
    "price": "от 130$ / день"
  },
  {
    "id": "fleet-haval-h6",
    "name": "Haval H6 Full",
    "description": "Современный и технологичный кроссовер.",
    "imageUrl": "https://picsum.photos/seed/haval-h6/800/600",
    "imageHint": "grey crossover",
    "features": ["1–4 места", "Полная комплектация", "Кроссовер"],
    "price": "от 90$ / день"
  },
  {
    "id": "fleet-haval-dargo",
    "name": "Haval Dargo",
    "description": "Брутальный кроссовер для любых дорог.",
    "imageUrl": "https://picsum.photos/seed/haval-dargo/800/600",
    "imageHint": "orange crossover",
    "features": ["до 4 мест", "Кроссовер", "Высокий клиренс"],
    "price": "от 95$ / день"
  },
  {
    "id": "fleet-byd-champion",
    "name": "BYD Champion",
    "description": "Стильный и динамичный электромобиль.",
    "imageUrl": "https://picsum.photos/seed/byd-champion/800/600",
    "imageHint": "green electric car",
    "features": ["1–3 места", "Электромобиль", "Запас хода 500км"],
    "price": "от 80$ / день"
  },
  {
    "id": "fleet-aiqar-eq7",
    "name": "Aiqar EQ7",
    "description": "Футуристичный электромобиль-кроссовер.",
    "imageUrl": "https://picsum.photos/seed/aiqar-eq7/800/600",
    "imageHint": "silver electric suv",
    "features": ["1–3 места", "Электромобиль", "Кроссовер"],
    "price": "от 85$ / день"
  },
  
  // Comfort & Standard
  {
    "id": "fleet-chevrolet-malibu-2",
    "name": "Chevrolet Malibu 2",
    "description": "Комфортный седан бизнес-класса.",
    "imageUrl": "https://picsum.photos/seed/malibu-2/800/600",
    "imageHint": "white sedan street",
    "features": ["1–3 места", "Кожаный салон", "Комфорт-класс"],
    "price": "от 70$ / день"
  },
  {
    "id": "fleet-kia-k5",
    "name": "Kia K5",
    "description": "Яркий и современный седан 2024 года.",
    "imageUrl": "https://picsum.photos/seed/kia-k5/800/600",
    "imageHint": "blue sedan",
    "features": ["1–3 места", "Модель 2024 года", "Стильный дизайн"],
    "price": "от 80$ / день"
  },
  {
    "id": "fleet-kia-sportage",
    "name": "Kia Sportage",
    "description": "Универсальный и практичный кроссовер.",
    "imageUrl": "https://picsum.photos/seed/kia-sportage/800/600",
    "imageHint": "red crossover",
    "features": ["1–4 места", "Кроссовер", "Высокая посадка"],
    "price": "от 75$ / день"
  },
  {
    "id": "fleet-chevrolet-captiva-5",
    "name": "Chevrolet Captiva 5",
    "description": "Семиместный семейный кроссовер.",
    "imageUrl": "https://picsum.photos/seed/captiva-5/800/600",
    "imageHint": "silver crossover",
    "features": ["от 4 до 7 мест", "Кроссовер", "Семейный автомобиль"],
    "price": "от 80$ / день"
  },
  {
    "id": "fleet-chevrolet-cobalt",
    "name": "Chevrolet Cobalt",
    "description": "Надежный и экономичный седан.",
    "imageUrl": "https://picsum.photos/seed/cobalt/800/600",
    "imageHint": "grey sedan simple",
    "features": ["2–3 места", "Эконом-класс", "Кондиционер"],
    "price": "от 50$ / день"
  },
  {
    "id": "fleet-jac-j7",
    "name": "Jac J7",
    "description": "Просторный и доступный лифтбэк.",
    "imageUrl": "https://picsum.photos/seed/jac-j7/800/600",
    "imageHint": "red liftback",
    "features": ["до 3 мест", "Большой багажник", "Современный вид"],
    "price": "от 60$ / день"
  },

  // Minivans
  {
    "id": "fleet-hyundai-staria",
    "name": "Hyundai Staria",
    "description": "Минивэн бизнес-класса с капитанскими креслами.",
    "imageUrl": "https://picsum.photos/seed/hyundai-staria/800/600",
    "imageHint": "futuristic black van",
    "features": ["1–8 мест", "Бизнес-класс", "Капитанские кресла"],
    "price": "от 100$ / день"
  },
  {
    "id": "fleet-kia-carnival",
    "name": "Kia Carnival",
    "description": "Роскошный VIP-минивэн для дальних поездок.",
    "imageUrl": "https://picsum.photos/seed/kia-carnival/800/600",
    "imageHint": "white luxury minivan",
    "features": ["1–5 мест", "VIP-минивэн", "Повышенный комфорт"],
    "price": "от 110$ / день"
  },
  {
    "id": "fleet-hyundai-starex",
    "name": "Hyundai Grand Starex",
    "description": "Надежный и вместительный минивэн.",
    "imageUrl": "https://picsum.photos/seed/hyundai-starex/800/600",
    "imageHint": "silver minivan",
    "features": ["до 7 мест", "Проверенная модель", "Вместительный"],
    "price": "от 90$ / день"
  },
  {
    "id": "fleet-kia-carens",
    "name": "Kia Carens",
    "description": "Компактный и маневренный минивэн.",
    "imageUrl": "https://picsum.photos/seed/kia-carens/800/600",
    "imageHint": "blue compact van",
    "features": ["5–6 мест", "Для семьи", "Городские поездки"],
    "price": "от 85$ / день"
  },
  {
    "id": "fleet-baw-m7",
    "name": "Baw M7",
    "description": "Просторный минивэн с капитанскими креслами.",
    "imageUrl": "https://picsum.photos/seed/baw-m7/800/600",
    "imageHint": "black minivan interior",
    "features": ["до 8 мест", "Капитанские кресла", "Для групп"],
    "price": "от 95$ / день"
  },
  {
    "id": "fleet-jac-refine-m4",
    "name": "Jac Refine M4",
    "description": "Вместительный минивэн для групповых поездок.",
    "imageUrl": "https://picsum.photos/seed/jac-m4/800/600",
    "imageHint": "white passenger van",
    "features": ["до 8 мест", "Групповые трансферы", "Большой салон"],
    "price": "от 90$ / день"
  },
  {
    "id": "fleet-mercedes-vito",
    "name": "Mercedes-Benz Vito",
    "description": "Комфортабельный минивэн от Mercedes.",
    "imageUrl": "https://picsum.photos/seed/mercedes-vito/800/600",
    "imageHint": "black mercedes van",
    "features": ["до 7 мест", "Комфорт и престиж", "Бизнес-поездки"],
    "price": "от 120$ / день"
  },

  // Buses
  {
    "id": "fleet-mercedes-sprinter",
    "name": "Mercedes-Benz Sprinter",
    "description": "Надежный микроавтобус для групп.",
    "imageUrl": "https://picsum.photos/seed/sprinter/800/600",
    "imageHint": "white sprinter van",
    "features": ["16–18 мест", "Экскурсии", "Корпоративные выезды"],
    "price": "от 180$ / день"
  },
  {
    "id": "fleet-toyota-hiace",
    "name": "Toyota Hiace",
    "description": "Популярный микроавтобус для туризма.",
    "imageUrl": "https://picsum.photos/seed/toyota-hiace/800/600",
    "imageHint": "white tourist van",
    "features": ["до 14 мест", "Туристические группы", "Надежность"],
    "price": "от 150$ / день"
  },
  {
    "id": "fleet-foton-view-cs2",
    "name": "Foton View CS2",
    "description": "Современный микроавтобус для пассажиров.",
    "imageUrl": "https://picsum.photos/seed/foton-view/800/600",
    "imageHint": "passenger van side",
    "features": ["до 14 мест", "Комфортный салон", "Пассажирские перевозки"],
    "price": "от 140$ / день"
  },
  {
    "id": "fleet-joylong",
    "name": "Joylong",
    "description": "Вместительный микроавтобус для больших групп.",
    "imageUrl": "https://picsum.photos/seed/joylong/800/600",
    "imageHint": "large white van",
    "features": ["до 17 мест", "Большие группы", "Трансферы"],
    "price": "от 160$ / день"
  },
  {
    "id": "fleet-jac-sunray",
    "name": "Jac Sunray",
    "description": "Просторный микроавтобус на 19 мест.",
    "imageUrl": "https://picsum.photos/seed/jac-sunray/800/600",
    "imageHint": "white minibus",
    "features": ["19 мест", "Максимальная вместимость", "Групповые туры"],
    "price": "от 170$ / день"
  },
  {
    "id": "fleet-setra-minibus",
    "name": "Setra Minibus",
    "description": "Комфортабельный автобус для делегаций.",
    "imageUrl": "https://picsum.photos/seed/setra-minibus/800/600",
    "imageHint": "small luxury bus",
    "features": ["до 20 мест", "Повышенный комфорт", "Делегации"],
    "price": "от 200$ / день"
  },
  {
    "id": "fleet-yutong-bus",
    "name": "Yutong",
    "description": "Большой туристический автобус для дальних поездок.",
    "imageUrl": "https://picsum.photos/seed/yutong-bus/800/600",
    "imageHint": "large tour bus",
    "features": ["50–55 мест", "Туристический автобус", "Для больших групп"],
    "price": "от 250$ / день"
  }
];
