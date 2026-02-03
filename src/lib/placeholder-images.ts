export type ImagePlaceholder = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  imageUrl: string;
  imageHint: string;
  features?: string[];
  price?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
  // Existing hero and about images
  {
    "id": "hero-lixiang-l7",
    "nameKey": "hero_lixiang_l7_name",
    "descriptionKey": "hero_lixiang_l7_desc",
    "imageUrl": "/images/h-background.jpg",
    "imageHint": "suv mountains"
  },
  {
    "id": "location-bukhara",
    "nameKey": "location_bukhara_name",
    "descriptionKey": "location_bukhara_desc",
    "imageUrl": "/images/about-1.jpg",
    "imageHint": "ancient fortress"
  },
  {
    "id": "location-samarkand",
    "nameKey": "location_samarkand_name",
    "descriptionKey": "location_samarkand_desc",
    "imageUrl": "/images/about-2.jpg",      
    "imageHint": "historic square"
  },
  {
    "id": "stats-background",
    "nameKey": "stats_background_name",
    "descriptionKey": "stats_background_desc",
    "imageUrl": "/images/stats.jpg",
    "imageHint": "abstract colorful"
  },
  {
    "id": "faq-image",
    "nameKey": "faq_image_name",
    "descriptionKey": "faq_image_desc",
    "imageUrl": "/images/faq.jpg",
    "imageHint": "uzbekistan architecture"
  },
  {
    "id": "gallery-1",
    "nameKey": "gallery_1_name",
    "descriptionKey": "gallery_1_desc",
    "imageUrl": "/images/gallery-8.jpg",
    "imageHint": "mosque entrance"
  },
  {
    "id": "gallery-2",
    "nameKey": "gallery_2_name",
    "descriptionKey": "gallery_2_desc",
    "imageUrl": "/images/gallery-1.jpg",
    "imageHint": "couple traditional"
  },
  {
    "id": "gallery-3",
    "nameKey": "gallery_3_name",
    "descriptionKey": "gallery_3_desc",
    "imageUrl": "/images/gallery-3.jpg",
    "imageHint": "tea house"
  },
  {
    "id": "gallery-4",
    "nameKey": "gallery_4_name",
    "descriptionKey": "gallery_4_desc",
    "imageUrl": "/images/gallery-6.jpg",
    "imageHint": "market textiles"
  },
  {
    "id": "gallery-5",
    "nameKey": "gallery_5_name",
    "descriptionKey": "gallery_5_desc",
    "imageUrl": "/images/gallery-4.jpg",
    "imageHint": "uzbek food"
  },
  {
    "id": "gallery-6",
    "nameKey": "gallery_6_name",
    "descriptionKey": "gallery_6_desc",
    "imageUrl": "/images/gallery-2.jpg",
    "imageHint": "desert road"
  }
];
