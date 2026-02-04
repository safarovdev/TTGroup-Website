import placeholderData from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = placeholderData.placeholderImages;
