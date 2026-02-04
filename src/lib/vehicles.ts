export type Vehicle = {
    // This `id` property should match the document ID in Firestore
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
  
// NOTE: Vehicle data is now loaded dynamically from Firestore.
// This array is empty and should not be used directly in components.
export const Vehicles: Vehicle[] = [];
