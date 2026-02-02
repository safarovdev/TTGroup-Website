export type Vehicle = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageHint: string;
    features?: string[];
    price?: string;
  };
  
  export const Vehicles: Vehicle[] = [
    // Premium & VIP
    {
      "id": "fleet-lixiang-l7",
      "name": "LiXiang L7",
      "description": "Премиальный VIP-кроссовер с панорамной крышей.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 4 мест", "Панорамная крыша", "Оттоманка", "VIP-класс"],
      "price": "от 120$ / день"
    },
    {
      "id": "fleet-chevrolet-tahoe-rs",
      "name": "Chevrolet Tahoe RS",
      "description": "Вместительный внедорожник премиум-класса.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–4 места", "Премиум-внедорожник", "Просторный салон"],
      "price": "от 140$ / день"
    },
    {
      "id": "fleet-mercedes-s500",
      "name": "Mercedes-Benz S500",
      "description": "Представительский седан с панорамной крышей.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 3 мест", "Кожаный салон", "Панорамная крыша"],
      "price": "от 150$ / день"
    },
    {
      "id": "fleet-toyota-lc-200",
      "name": "Toyota Land Cruiser 200",
      "description": "Надежный и комфортный внедорожник.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–4 места", "Полноприводный внедорожник"],
      "price": "от 130$ / день"
    },
    {
      "id": "fleet-haval-h6",
      "name": "Haval H6 Full",
      "description": "Современный и технологичный кроссовер.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–4 места", "Полная комплектация", "Кроссовер"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-haval-dargo",
      "name": "Haval Dargo",
      "description": "Брутальный кроссовер для любых дорог.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 4 мест", "Кроссовер", "Высокий клиренс"],
      "price": "от 95$ / день"
    },
    {
      "id": "fleet-byd-champion",
      "name": "BYD Champion",
      "description": "Стильный и динамичный электромобиль.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–3 места", "Электромобиль", "Запас хода 500км"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-aiqar-eq7",
      "name": "Aiqar EQ7",
      "description": "Футуристичный электромобиль-кроссовер.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–3 места", "Электромобиль", "Кроссовер"],
      "price": "от 85$ / день"
    },
    
    // Comfort & Standard
    {
      "id": "fleet-chevrolet-malibu-2",
      "name": "Chevrolet Malibu 2",
      "description": "Комфортный седан бизнес-класса.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–3 места", "Кожаный салон", "Комфорт-класс"],
      "price": "от 70$ / день"
    },
    {
      "id": "fleet-kia-k5",
      "name": "Kia K5",
      "description": "Яркий и современный седан 2024 года.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–3 места", "Модель 2024 года", "Стильный дизайн"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-kia-sportage",
      "name": "Kia Sportage",
      "description": "Универсальный и практичный кроссовер.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–4 места", "Кроссовер", "Высокая посадка"],
      "price": "от 75$ / день"
    },
    {
      "id": "fleet-chevrolet-captiva-5",
      "name": "Chevrolet Captiva 5",
      "description": "Семиместный семейный кроссовер.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["от 4 до 7 мест", "Кроссовер", "Семейный автомобиль"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-chevrolet-cobalt",
      "name": "Chevrolet Cobalt",
      "description": "Надежный и экономичный седан.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["2–3 места", "Эконом-класс", "Кондиционер"],
      "price": "от 50$ / день"
    },
    {
      "id": "fleet-jac-j7",
      "name": "Jac J7",
      "description": "Просторный и доступный лифтбэк.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 3 мест", "Большой багажник", "Современный вид"],
      "price": "от 60$ / день"
    },
  
    // Minivans
    {
      "id": "fleet-hyundai-staria",
      "name": "Hyundai Staria",
      "description": "Минивэн бизнес-класса с капитанскими креслами.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–8 мест", "Бизнес-класс", "Капитанские кресла"],
      "price": "от 100$ / день"
    },
    {
      "id": "fleet-kia-carnival",
      "name": "Kia Carnival",
      "description": "Роскошный VIP-минивэн для дальних поездок.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["1–5 мест", "VIP-минивэн", "Повышенный комфорт"],
      "price": "от 110$ / день"
    },
    {
      "id": "fleet-hyundai-starex",
      "name": "Hyundai Grand Starex",
      "description": "Надежный и вместительный минивэн.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 7 мест", "Проверенная модель", "Вместительный"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-kia-carens",
      "name": "Kia Carens",
      "description": "Компактный и маневренный минивэн.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["5–6 мест", "Для семьи", "Городские поездки"],
      "price": "от 85$ / день"
    },
    {
      "id": "fleet-baw-m7",
      "name": "Baw M7",
      "description": "Просторный минивэн с капитанскими креслами.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 8 мест", "Капитанские кресла", "Для групп"],
      "price": "от 95$ / день"
    },
    {
      "id": "fleet-jac-refine-m4",
      "name": "Jac Refine M4",
      "description": "Вместительный минивэн для групповых поездок.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 8 мест", "Групповые трансферы", "Большой салон"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-mercedes-vito",
      "name": "Mercedes-Benz Vito",
      "description": "Комфортабельный минивэн от Mercedes.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 7 мест", "Комфорт и престиж", "Бизнес-поездки"],
      "price": "от 120$ / день"
    },
  
    // Buses
    {
      "id": "fleet-mercedes-sprinter",
      "name": "Mercedes-Benz Sprinter",
      "description": "Надежный микроавтобус для групп.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["16–18 мест", "Экскурсии", "Корпоративные выезды"],
      "price": "от 180$ / день"
    },
    {
      "id": "fleet-toyota-hiace",
      "name": "Toyota Hiace",
      "description": "Популярный микроавтобус для туризма.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 14 мест", "Туристические группы", "Надежность"],
      "price": "от 150$ / день"
    },
    {
      "id": "fleet-foton-view-cs2",
      "name": "Foton View CS2",
      "description": "Современный микроавтобус для пассажиров.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 14 мест", "Комфортный салон", "Пассажирские перевозки"],
      "price": "от 140$ / день"
    },
    {
      "id": "fleet-joylong",
      "name": "Joylong",
      "description": "Вместительный микроавтобус для больших групп.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 17 мест", "Большие группы", "Трансферы"],
      "price": "от 160$ / день"
    },
    {
      "id": "fleet-jac-sunray",
      "name": "Jac Sunray",
      "description": "Просторный микроавтобус на 19 мест.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["19 мест", "Максимальная вместимость", "Групповые туры"],
      "price": "от 170$ / день"
    },
    {
      "id": "fleet-setra-minibus",
      "name": "Setra Minibus",
      "description": "Комфортабельный автобус для делегаций.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["до 20 мест", "Повышенный комфорт", "Делегации"],
      "price": "от 200$ / день"
    },
    {
      "id": "fleet-yutong-bus",
      "name": "Yutong",
      "description": "Большой туристический автобус для дальних поездок.",
      "imageUrl": "/placeholder.jpg",
      "imageHint": "",
      "features": ["50–55 мест", "Туристический автобус", "Для больших групп"],
      "price": "от 250$ / день"
    }
  ];
  