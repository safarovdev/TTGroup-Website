export interface TransferPriceInfo {
    vehicleId: string;
    price: number;
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
