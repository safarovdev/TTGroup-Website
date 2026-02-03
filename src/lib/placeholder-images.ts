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
  {
    "id": "faq-image",
    "name": "FAQ Section Image",
    "description": "Architectural detail of a building in Uzbekistan.",
    "imageUrl": "https://picsum.photos/seed/faq/400/500",
    "imageHint": "uzbekistan architecture"
  },
  {
    "id": "gallery-1",
    "name": "Gallery Image 1",
    "description": "Ornate blue tiled entrance to a historic building.",
    "imageUrl": "https://picsum.photos/seed/gallery1/500/700",
    "imageHint": "mosque entrance"
  },
  {
    "id": "gallery-2",
    "name": "Gallery Image 2",
    "description": "Couple in traditional Uzbek clothing smiling.",
    "imageUrl": "https://picsum.photos/seed/gallery2/500/500",
    "imageHint": "couple traditional"
  },
  {
    "id": "gallery-3",
    "name": "Gallery Image 3",
    "description": "Interior of a traditional Uzbek tea house.",
    "imageUrl": "https://picsum.photos/seed/gallery3/500/800",
    "imageHint": "tea house"
  },
  {
    "id": "gallery-4",
    "name": "Gallery Image 4",
    "description": "Vibrant textiles at a local market.",
    "imageUrl": "https://picsum.photos/seed/gallery4/500/600",
    "imageHint": "market textiles"
  },
  {
    "id": "gallery-5",
    "name": "Gallery Image 5",
    "description": "A plate of traditional plov.",
    "imageUrl": "https://picsum.photos/seed/gallery5/500/400",
    "imageHint": "uzbek food"
  },
  {
    "id": "gallery-6",
    "name": "Gallery Image 6",
    "description": "View of the desert from a car window.",
    "imageUrl": "https://picsum.photos/seed/gallery6/500/750",
    "imageHint": "desert road"
  }
];
