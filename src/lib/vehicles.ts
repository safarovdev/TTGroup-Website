export type Vehicle = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageHint: string;
    category: 'premium' | 'comfort' | 'minivan' | 'bus';
    features?: string[];
    price?: string;
  };
  
  export const vehicleCategoryMap: Record<Vehicle['category'], string> = {
      premium: '💎 Премиум и VIP-класс',
      comfort: '🚗 Комфорт и Стандарт',
      minivan: '🚐 Минивэны',
      bus: '🚌 Микроавтобусы и Автобусы',
  };
  
  export const Vehicles: Vehicle[] = [
    // Premium & VIP
    {
      "id": "fleet-lixiang-l7",
      "name": "LiXiang L7",
      "category": "premium",
      "description": "Премиальный VIP-кроссовер с панорамной крышей.",
      "imageUrl": "",
      "imageHint": "white suv",
      "features": ["до 4 мест", "панорама", "оттоманка", "VIP"],
      "price": "от 120$ / день"
    },
    {
      "id": "fleet-chevrolet-tahoe-rs",
      "name": "Chevrolet Tahoe RS",
      "category": "premium",
      "description": "Вместительный внедорожник премиум-класса.",
      "imageUrl": "",
      "imageHint": "black suv",
      "features": ["1–4 места", "внедорожник премиум-класса"],
      "price": "от 140$ / день"
    },
    {
      "id": "fleet-mercedes-s500",
      "name": "Mercedes-Benz S500",
      "category": "premium",
      "description": "Представительский седан с панорамной крышей.",
      "imageUrl": "",
      "imageHint": "black sedan",
      "features": ["до 3 мест", "кожаный салон", "панорама"],
      "price": "от 150$ / день"
    },
    {
      "id": "fleet-toyota-lc-200",
      "name": "Toyota Land Cruiser 200",
      "category": "premium",
      "description": "Надежный и комфортный внедорожник.",
      "imageUrl": "",
      "imageHint": "white suv desert",
      "features": ["1–4 места", "внедорожник"],
      "price": "от 130$ / день"
    },
    {
      "id": "fleet-haval-h6",
      "name": "Haval H6 Full",
      "category": "premium",
      "description": "Современный и технологичный кроссовер.",
      "imageUrl": "",
      "imageHint": "grey suv",
      "features": ["1–4 места", "кроссовер"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-haval-dargo",
      "name": "Haval Dargo",
      "category": "premium",
      "description": "Брутальный кроссовер для любых дорог.",
      "imageUrl": "",
      "imageHint": "orange suv",
      "features": ["до 4 мест"],
      "price": "от 95$ / день"
    },
    {
      "id": "fleet-byd-champion",
      "name": "BYD Champion",
      "category": "premium",
      "description": "Стильный и динамичный электромобиль.",
      "imageUrl": "",
      "imageHint": "blue sedan",
      "features": ["1–3 места", "электромобиль"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-aiqar-eq7",
      "name": "Aiqar EQ7",
      "category": "premium",
      "description": "Футуристичный электромобиль-кроссовер.",
      "imageUrl": "",
      "imageHint": "green suv",
      "features": ["1–3 места", "электромобиль"],
      "price": "от 85$ / день"
    },
    
    // Comfort & Standard
    {
      "id": "fleet-chevrolet-malibu-2",
      "name": "Chevrolet Malibu 2",
      "category": "comfort",
      "description": "Комфортный седан бизнес-класса.",
      "imageUrl": "",
      "imageHint": "white sedan",
      "features": ["1–3 места", "кожаный салон"],
      "price": "от 70$ / день"
    },
    {
      "id": "fleet-kia-k5",
      "name": "Kia K5",
      "category": "comfort",
      "description": "Яркий и современный седан 2024 года.",
      "imageUrl": "",
      "imageHint": "white sedan night",
      "features": ["1–3 места", "модель 2024 года"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-kia-sportage",
      "name": "Kia Sportage",
      "category": "comfort",
      "description": "Универсальный и практичный кроссовер.",
      "imageUrl": "",
      "imageHint": "blue suv",
      "features": ["1–4 места", "кроссовер"],
      "price": "от 75$ / день"
    },
    {
      "id": "fleet-captiva-5",
      "name": "Chevrolet Captiva / Captiva 5 Premier",
      "category": "comfort",
      "description": "Семиместный семейный кроссовер.",
      "imageUrl": "",
      "imageHint": "red suv",
      "features": ["от 4 до 7 мест"],
      "price": "от 80$ / день"
    },
    {
      "id": "fleet-chevrolet-cobalt",
      "name": "Chevrolet Cobalt",
      "category": "comfort",
      "description": "Надежный и экономичный седан.",
      "imageUrl": "",
      "imageHint": "silver sedan",
      "features": ["2–3 места"],
      "price": "от 50$ / день"
    },
    {
      "id": "fleet-jac-j7",
      "name": "Jac J7",
      "category": "comfort",
      "description": "Просторный и доступный лифтбэк.",
      "imageUrl": "",
      "imageHint": "red liftback",
      "features": ["до 3 мест"],
      "price": "от 60$ / день"
    },
  
    // Minivans
    {
      "id": "fleet-hyundai-staria",
      "name": "Hyundai Staria",
      "category": "minivan",
      "description": "Минивэн бизнес-класса с капитанскими креслами.",
      "imageUrl": "",
      "imageHint": "black minivan",
      "features": ["1–8 мест", "бизнес-класс", "капитанские кресла"],
      "price": "от 100$ / день"
    },
    {
      "id": "fleet-kia-carnival",
      "name": "Kia Carnival",
      "category": "minivan",
      "description": "Роскошный VIP-минивэн для дальних поездок.",
      "imageUrl": "",
      "imageHint": "white minivan",
      "features": ["1–5 мест", "VIP-минивэн"],
      "price": "от 110$ / день"
    },
    {
      "id": "fleet-hyundai-starex",
      "name": "Hyundai Starex / Grand Starex",
      "category": "minivan",
      "description": "Надежный и вместительный минивэн.",
      "imageUrl": "",
      "imageHint": "silver minivan",
      "features": ["до 7 мест"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-kia-carens",
      "name": "Kia Carens",
      "category": "minivan",
      "description": "Компактный и маневренный минивэн.",
      "imageUrl": "",
      "imageHint": "blue minivan",
      "features": ["5–6 мест"],
      "price": "от 85$ / день"
    },
    {
      "id": "fleet-baw-m7",
      "name": "Baw M7",
      "category": "minivan",
      "description": "Просторный минивэн с капитанскими креслами.",
      "imageUrl": "",
      "imageHint": "white minivan front",
      "features": ["до 8 мест", "капитанские кресла"],
      "price": "от 95$ / день"
    },
    {
      "id": "fleet-jac-refine-m4",
      "name": "Jac Refine M4",
      "category": "minivan",
      "description": "Вместительный минивэн для групповых поездок.",
      "imageUrl": "",
      "imageHint": "black minivan side",
      "features": ["до 8 мест"],
      "price": "от 90$ / день"
    },
    {
      "id": "fleet-mercedes-vito",
      "name": "Mercedes-Benz Vito",
      "category": "minivan",
      "description": "Комфортабельный минивэн от Mercedes.",
      "imageUrl": "",
      "imageHint": "black minivan mercedes",
      "features": ["до 7 мест"],
      "price": "от 120$ / день"
    },
  
    // Buses
    {
      "id": "fleet-mercedes-sprinter",
      "name": "Mercedes-Benz Sprinter",
      "category": "bus",
      "description": "Надежный микроавтобус для групп.",
      "imageUrl": "",
      "imageHint": "white bus",
      "features": ["16–18 мест"],
      "price": "от 180$ / день"
    },
    {
      "id": "fleet-toyota-hiace",
      "name": "Toyota Hiace",
      "category": "bus",
      "description": "Популярный микроавтобус для туризма.",
      "imageUrl": "",
      "imageHint": "white bus side",
      "features": ["до 14 мест"],
      "price": "от 150$ / день"
    },
    {
      "id": "fleet-foton-view-cs2",
      "name": "Foton View CS2",
      "category": "bus",
      "description": "Современный микроавтобус для пассажиров.",
      "imageUrl": "",
      "imageHint": "white bus front",
      "features": ["до 14 мест"],
      "price": "от 140$ / день"
    },
    {
      "id": "fleet-joylong",
      "name": "Joylong",
      "category": "bus",
      "description": "Вместительный микроавтобус для больших групп.",
      "imageUrl": "",
      "imageHint": "white van",
      "features": ["до 17 мест"],
      "price": "от 160$ / день"
    },
    {
      "id": "fleet-jac-sunray",
      "name": "Jac Sunray",
      "category": "bus",
      "description": "Просторный микроавтобус на 19 мест.",
      "imageUrl": "",
      "imageHint": "white van side",
      "features": ["19 мест"],
      "price": "от 170$ / день"
    },
    {
      "id": "fleet-setra-minibus",
      "name": "Setra Minibus",
      "category": "bus",
      "description": "Комфортабельный автобус для делегаций.",
      "imageUrl": "",
      "imageHint": "white coach bus",
      "features": ["до 20 мест"],
      "price": "от 200$ / день"
    },
    {
      "id": "fleet-yutong-bus",
      "name": "Yutong",
      "category": "bus",
      "description": "Большой туристический автобус для дальних поездок.",
      "imageUrl": "",
      "imageHint": "white tour bus",
      "features": ["50–55 мест"],
      "price": "от 250$ / день"
    }
  ];
