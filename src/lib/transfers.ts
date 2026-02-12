export interface TransferPriceInfo {
    category: 'premium' | 'comfort' | 'minivan' | 'bus';
    price: number;
    vehicleIds?: string[];
}

export interface Transfer {
    id: string;
    serviceType: 'intercity' | 'meet_and_greet' | 'excursion';
    city?: string;
    from?: string;
    to?: string;
    title_ru: string;
    title_en: string;
    description_ru?: string;
    description_en?: string;
    prices: TransferPriceInfo[];
    isFeatured?: boolean;
    displayOrder?: number;
}
