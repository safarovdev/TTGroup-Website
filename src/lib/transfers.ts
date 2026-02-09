export interface TransferPriceInfo {
    category: 'premium' | 'comfort' | 'minivan' | 'bus';
    price: number;
    vehicleIds?: string[];
}

export interface Transfer {
    id: string;
    title: string;
    from: string;
    to: string;
    drivingTime: string;
    drivingDistance: string;
    prices: TransferPriceInfo[];
    isFeatured?: boolean;
}
