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
    "imageUrl": "/images/about-2.jpg",
    "imageHint": "uzbekistan architecture"
  }
];
