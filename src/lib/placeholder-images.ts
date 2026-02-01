export type ImagePlaceholder = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  specs?: {
    seats: string;
    luggage: string;
    transmission: string;
  };
  price?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
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
      "id": "fleet-lixiang-l7",
      "name": "LiXiang L7",
      "description": "Front view of a white LiXiang L7.",
      "imageUrl": "https://images.unsplash.com/photo-1684849311658-eba18b95ba9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3aGl0ZSUyMHN1dnxlbnwwfHx8fDE3Njk4MDIzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "white suv",
      "specs": { "seats": "5 мест", "luggage": "2 багажа", "transmission": "АКПП" },
      "price": "от 120$ / день"
    },
    {
      "id": "fleet-mercedes-s500",
      "name": "Mercedes S500",
      "description": "A luxury black Mercedes S500 sedan.",
      "imageUrl": "https://images.unsplash.com/photo-1675682567759-16f4ffec941c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxibGFjayUyMHNlZGFufGVufDB8fHx8MTc2OTc3MDA2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "black sedan",
      "specs": { "seats": "4 места", "luggage": "2 багажа", "transmission": "АКПП" },
      "price": "от 150$ / день"
    },
    {
      "id": "fleet-chevrolet-tahoe",
      "name": "Chevrolet Tahoe",
      "description": "A large black Chevrolet Tahoe SUV.",
      "imageUrl": "https://images.unsplash.com/photo-1736508835016-f3b85ea09dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YmxhY2slMjBzdXZ8ZW58MHx8fHwxNzY5NzUyMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "black suv",
      "specs": { "seats": "7 мест", "luggage": "4 багажа", "transmission": "АКПП" },
      "price": "от 140$ / день"
    },
    {
      "id": "fleet-kia-carnival",
      "name": "Kia Carnival",
      "description": "A modern white Kia Carnival minivan.",
      "imageUrl": "https://images.unsplash.com/photo-1760445726970-5d60f8f882d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2hpdGUlMjBtaW5pdmFufGVufDB8fHx8MTc2OTgwMjM0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "white minivan",
      "specs": { "seats": "8 мест", "luggage": "5 багажей", "transmission": "АКПП" },
      "price": "от 100$ / день"
    },
    {
      "id": "fleet-hyundai-staria",
      "name": "Hyundai Staria",
      "description": "A futuristic silver Hyundai Staria van.",
      "imageUrl": "https://images.unsplash.com/photo-1759782178852-1d3213886837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzaWx2ZXIlMjB2YW58ZW58MHx8fHwxNzY5ODAyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "silver van",
      "specs": { "seats": "8 мест", "luggage": "5 багажей", "transmission": "АКПП" },
      "price": "от 100$ / день"
    },
    {
      "id": "fleet-yutong-bus",
      "name": "Yutong Bus",
      "description": "A large white Yutong tour bus.",
      "imageUrl": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0b3VyJTIwYnVzfGVufDB8fHx8MTc2OTgwMjM0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "tour bus",
      "specs": { "seats": "55 мест", "luggage": "50 багажей", "transmission": "МКПП" },
      "price": "от 250$ / день"
    },
    {
      "id": "fleet-mercedes-sprinter",
      "name": "Mercedes Sprinter",
      "description": "A white Mercedes Sprinter passenger van.",
      "imageUrl": "https://images.unsplash.com/photo-1569002861746-64bc833953b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3aGl0ZSUyMHZhbnxlbnwwfHx8fDE3Njk3NjIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "white van",
      "specs": { "seats": "20 мест", "luggage": "15 багажей", "transmission": "АКПП" },
      "price": "от 180$ / день"
    },
    {
      "id": "fleet-chevrolet-cobalt",
      "name": "Chevrolet Cobalt",
      "description": "A silver Chevrolet Cobalt sedan.",
      "imageUrl": "https://images.unsplash.com/photo-1758223724963-5c4f5ef0ce60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzaWx2ZXIlMjBzZWRhbnxlbnwwfHx8fDE3Njk3MjM1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "silver sedan",
      "specs": { "seats": "5 мест", "luggage": "2 багажа", "transmission": "АКПП" },
      "price": "от 50$ / день"
    },
    {
      "id": "fleet-chevrolet-malibu",
      "name": "Chevrolet Malibu 2",
      "description": "A modern white Chevrolet Malibu sedan.",
      "imageUrl": "https://images.unsplash.com/photo-1708344595439-0e24b5db9058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx3aGl0ZSUyMHNlZGFufGVufDB8fHx8MTc2OTgwMjM0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "white sedan",
      "specs": { "seats": "5 мест", "luggage": "3 багажа", "transmission": "АКПП" },
      "price": "от 70$ / день"
    },
    {
      "id": "fleet-kia-k5",
      "name": "Kia K5",
      "description": "A stylish grey Kia K5 sedan.",
      "imageUrl": "https://images.unsplash.com/photo-1682408138473-736d7b7f01b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncmV5JTIwc2VkYW58ZW58MHx8fHwxNzY5ODAyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "grey sedan",
      "specs": { "seats": "5 мест", "luggage": "2 багажа", "transmission": "АКПП" },
      "price": "от 80$ / день"
    },
    {
      "id": "stats-background",
      "name": "Abstract background for stats",
      "description": "Abstract colorful shapes background",
      "imageUrl": "/images/stats.jpg",
      "imageHint": "abstract colorful"
    }
  ];
