export type TransferVehicleType = 'sedan' | 'suv' | 'minivan';

export const transferVehicleTypeMap: Record<TransferVehicleType, { nameKey: string; capacityKey: string }> = {
    sedan: {
        nameKey: 'transferVehicles.sedan.name',
        capacityKey: 'transferVehicles.sedan.capacity',
    },
    suv: {
        nameKey: 'transferVehicles.suv.name',
        capacityKey: 'transferVehicles.suv.capacity',
    },
    minivan: {
        nameKey: 'transferVehicles.minivan.name',
        capacityKey: 'transferVehicles.minivan.capacity',
    },
};

export interface TransferPriceInfo {
    type: TransferVehicleType;
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
