export type Vehicle = {
    id: string;
    name: string;
    imageUrls: string[];
    category: 'premium' | 'comfort' | 'minivan' | 'bus';
    featureKeys: string[];
    price: number;
    capacity: number;
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
