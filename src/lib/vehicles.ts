export type Vehicle = {
    id: string;
    name: string;
    descriptionKey: string;
    imageUrl: string;
    imageHint: string;
    category: 'premium' | 'comfort' | 'minivan' | 'bus';
    featureKeys?: string[];
    priceKey?: string;
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
      "descriptionKey": "lixiang_l7_desc",
      "imageUrl": "",
      "imageHint": "white suv",
      "featureKeys": ["up_to_4_seats", "panorama", "ottoman", "vip"],
      "priceKey": "from_120_day"
    },
    {
      "id": "fleet-chevrolet-tahoe-rs",
      "name": "Chevrolet Tahoe RS",
      "category": "premium",
      "descriptionKey": "tahoe_rs_desc",
      "imageUrl": "",
      "imageHint": "black suv",
      "featureKeys": ["from_1_to_4_seats", "premium_suv"],
      "priceKey": "from_140_day"
    },
    {
      "id": "fleet-mercedes-s500",
      "name": "Mercedes-Benz S500",
      "category": "premium",
      "descriptionKey": "s500_desc",
      "imageUrl": "",
      "imageHint": "black sedan",
      "featureKeys": ["up_to_3_seats", "leather_interior", "panorama"],
      "priceKey": "from_150_day"
    },
    {
      "id": "fleet-toyota-lc-200",
      "name": "Toyota Land Cruiser 200",
      "category": "premium",
      "descriptionKey": "lc200_desc",
      "imageUrl": "",
      "imageHint": "white suv desert",
      "featureKeys": ["from_1_to_4_seats", "suv"],
      "priceKey": "from_130_day"
    },
    {
      "id": "fleet-haval-h6",
      "name": "Haval H6 Full",
      "category": "premium",
      "descriptionKey": "haval_h6_desc",
      "imageUrl": "",
      "imageHint": "grey suv",
      "featureKeys": ["from_1_to_4_seats", "crossover"],
      "priceKey": "from_90_day"
    },
    {
      "id": "fleet-haval-dargo",
      "name": "Haval Dargo",
      "category": "premium",
      "descriptionKey": "haval_dargo_desc",
      "imageUrl": "",
      "imageHint": "orange suv",
      "featureKeys": ["up_to_4_seats"],
      "priceKey": "from_95_day"
    },
    {
      "id": "fleet-byd-champion",
      "name": "BYD Champion",
      "category": "premium",
      "descriptionKey": "byd_champion_desc",
      "imageUrl": "",
      "imageHint": "blue sedan",
      "featureKeys": ["from_1_to_3_seats", "electric_car"],
      "priceKey": "from_80_day"
    },
    {
      "id": "fleet-aiqar-eq7",
      "name": "Aiqar EQ7",
      "category": "premium",
      "descriptionKey": "aiqar_eq7_desc",
      "imageUrl": "",
      "imageHint": "green suv",
      "featureKeys": ["from_1_to_3_seats", "electric_car"],
      "priceKey": "from_85_day"
    },
    
    // Comfort & Standard
    {
      "id": "fleet-chevrolet-malibu-2",
      "name": "Chevrolet Malibu 2",
      "category": "comfort",
      "descriptionKey": "malibu_2_desc",
      "imageUrl": "",
      "imageHint": "white sedan",
      "featureKeys": ["from_1_to_3_seats", "leather_interior"],
      "priceKey": "from_70_day"
    },
    {
      "id": "fleet-kia-k5",
      "name": "Kia K5",
      "category": "comfort",
      "descriptionKey": "kia_k5_desc",
      "imageUrl": "",
      "imageHint": "white sedan night",
      "featureKeys": ["from_1_to_3_seats", "model_2024"],
      "priceKey": "from_80_day"
    },
    {
      "id": "fleet-kia-sportage",
      "name": "Kia Sportage",
      "category": "comfort",
      "descriptionKey": "kia_sportage_desc",
      "imageUrl": "",
      "imageHint": "blue suv",
      "featureKeys": ["from_1_to_4_seats", "crossover"],
      "priceKey": "from_75_day"
    },
    {
      "id": "fleet-captiva-5",
      "name": "Chevrolet Captiva / Captiva 5 Premier",
      "category": "comfort",
      "descriptionKey": "captiva_5_desc",
      "imageUrl": "",
      "imageHint": "red suv",
      "featureKeys": ["from_4_to_7_seats"],
      "priceKey": "from_80_day"
    },
    {
      "id": "fleet-chevrolet-cobalt",
      "name": "Chevrolet Cobalt",
      "category": "comfort",
      "descriptionKey": "cobalt_desc",
      "imageUrl": "",
      "imageHint": "silver sedan",
      "featureKeys": ["from_2_to_3_seats"],
      "priceKey": "from_50_day"
    },
    {
      "id": "fleet-jac-j7",
      "name": "Jac J7",
      "category": "comfort",
      "descriptionKey": "jac_j7_desc",
      "imageUrl": "",
      "imageHint": "red liftback",
      "featureKeys": ["up_to_3_seats"],
      "priceKey": "from_60_day"
    },
  
    // Minivans
    {
      "id": "fleet-hyundai-staria",
      "name": "Hyundai Staria",
      "category": "minivan",
      "descriptionKey": "staria_desc",
      "imageUrl": "",
      "imageHint": "black minivan",
      "featureKeys": ["from_1_to_8_seats", "business_class", "captain_chairs"],
      "priceKey": "from_100_day"
    },
    {
      "id": "fleet-kia-carnival",
      "name": "Kia Carnival",
      "category": "minivan",
      "descriptionKey": "carnival_desc",
      "imageUrl": "",
      "imageHint": "white minivan",
      "featureKeys": ["from_1_to_5_seats", "vip_minivan"],
      "priceKey": "from_110_day"
    },
    {
      "id": "fleet-hyundai-starex",
      "name": "Hyundai Starex / Grand Starex",
      "category": "minivan",
      "descriptionKey": "starex_desc",
      "imageUrl": "",
      "imageHint": "silver minivan",
      "featureKeys": ["up_to_7_seats"],
      "priceKey": "from_90_day"
    },
    {
      "id": "fleet-kia-carens",
      "name": "Kia Carens",
      "category": "minivan",
      "descriptionKey": "carens_desc",
      "imageUrl": "",
      "imageHint": "blue minivan",
      "featureKeys": ["from_5_to_6_seats"],
      "priceKey": "from_85_day"
    },
    {
      "id": "fleet-baw-m7",
      "name": "Baw M7",
      "category": "minivan",
      "descriptionKey": "baw_m7_desc",
      "imageUrl": "",
      "imageHint": "white minivan front",
      "featureKeys": ["up_to_8_seats", "captain_chairs"],
      "priceKey": "from_95_day"
    },
    {
      "id": "fleet-jac-refine-m4",
      "name": "Jac Refine M4",
      "category": "minivan",
      "descriptionKey": "refine_m4_desc",
      "imageUrl": "",
      "imageHint": "black minivan side",
      "featureKeys": ["up_to_8_seats"],
      "priceKey": "from_90_day"
    },
    {
      "id": "fleet-mercedes-vito",
      "name": "Mercedes-Benz Vito",
      "category": "minivan",
      "descriptionKey": "vito_desc",
      "imageUrl": "",
      "imageHint": "black minivan mercedes",
      "featureKeys": ["up_to_7_seats"],
      "priceKey": "from_120_day"
    },
  
    // Buses
    {
      "id": "fleet-mercedes-sprinter",
      "name": "Mercedes-Benz Sprinter",
      "category": "bus",
      "descriptionKey": "sprinter_desc",
      "imageUrl": "",
      "imageHint": "white bus",
      "featureKeys": ["from_16_to_18_seats"],
      "priceKey": "from_180_day"
    },
    {
      "id": "fleet-toyota-hiace",
      "name": "Toyota Hiace",
      "category": "bus",
      "descriptionKey": "hiace_desc",
      "imageUrl": "",
      "imageHint": "white bus side",
      "featureKeys": ["up_to_14_seats"],
      "priceKey": "from_150_day"
    },
    {
      "id": "fleet-foton-view-cs2",
      "name": "Foton View CS2",
      "category": "bus",
      "descriptionKey": "foton_view_desc",
      "imageUrl": "",
      "imageHint": "white bus front",
      "featureKeys": ["up_to_14_seats"],
      "priceKey": "from_140_day"
    },
    {
      "id": "fleet-joylong",
      "name": "Joylong",
      "category": "bus",
      "descriptionKey": "joylong_desc",
      "imageUrl": "",
      "imageHint": "white van",
      "featureKeys": ["up_to_17_seats"],
      "priceKey": "from_160_day"
    },
    {
      "id": "fleet-jac-sunray",
      "name": "Jac Sunray",
      "category": "bus",
      "descriptionKey": "sunray_desc",
      "imageUrl": "",
      "imageHint": "white van side",
      "featureKeys": ["19_seats"],
      "priceKey": "from_170_day"
    },
    {
      "id": "fleet-setra-minibus",
      "name": "Setra Minibus",
      "category": "bus",
      "descriptionKey": "setra_desc",
      "imageUrl": "",
      "imageHint": "white coach bus",
      "featureKeys": ["up_to_20_seats"],
      "priceKey": "from_200_day"
    },
    {
      "id": "fleet-yutong-bus",
      "name": "Yutong",
      "category": "bus",
      "descriptionKey": "yutong_desc",
      "imageUrl": "",
      "imageHint": "white tour bus",
      "featureKeys": ["from_50_to_55_seats"],
      "priceKey": "from_250_day"
    }
  ];
