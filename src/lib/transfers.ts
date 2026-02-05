export interface TransferPriceInfo {
    type: 'sedan' | 'suv' | 'minivan';
    price: number;
}

export interface TransferRoute {
    id: string;
    titleKey: string;
    drivingTimeKey: string;
    drivingDistanceKey: string;
    prices: TransferPriceInfo[];
}

export const privateTransfers: TransferRoute[] = [
    {
        id: 'khiva-urgench-airport',
        titleKey: 'privateTransfers.routes.khiva-urgench-airport.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-urgench-airport.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-urgench-airport.drivingDistance',
        prices: [
            { type: 'sedan', price: 15 },
            { type: 'suv', price: 25 },
            { type: 'minivan', price: 40 },
        ],
    },
    {
        id: 'urgench-airport-khiva',
        titleKey: 'privateTransfers.routes.urgench-airport-khiva.title',
        drivingTimeKey: 'privateTransfers.routes.urgench-airport-khiva.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.urgench-airport-khiva.drivingDistance',
        prices: [
            { type: 'sedan', price: 20 },
            { type: 'suv', price: 25 },
            { type: 'minivan', price: 40 },
        ],
    },
    {
        id: 'khiva-shawat-border',
        titleKey: 'privateTransfers.routes.khiva-shawat-border.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-shawat-border.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-shawat-border.drivingDistance',
        prices: [
            { type: 'sedan', price: 24 },
            { type: 'suv', price: 55 },
            { type: 'minivan', price: 65 },
        ],
    },
    {
        id: 'bukhara-farap-border',
        titleKey: 'privateTransfers.routes.bukhara-farap-border.title',
        drivingTimeKey: 'privateTransfers.routes.bukhara-farap-border.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.bukhara-farap-border.drivingDistance',
        prices: [
            { type: 'sedan', price: 29 },
            { type: 'suv', price: 60 },
            { type: 'minivan', price: 70 },
        ],
    },
    {
        id: 'khiva-ayazkala',
        titleKey: 'privateTransfers.routes.khiva-ayazkala.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-ayazkala.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-ayazkala.drivingDistance',
        prices: [
            { type: 'sedan', price: 39 },
            { type: 'suv', price: 70 },
            { type: 'minivan', price: 95 },
        ],
    },
    {
        id: 'bukhara-ayazkala',
        titleKey: 'privateTransfers.routes.bukhara-ayazkala.title',
        drivingTimeKey: 'privateTransfers.routes.bukhara-ayazkala.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.bukhara-ayazkala.drivingDistance',
        prices: [
            { type: 'sedan', price: 89 },
            { type: 'suv', price: 170 },
            { type: 'minivan', price: 215 },
        ],
    },
    {
        id: 'khiva-nukus',
        titleKey: 'privateTransfers.routes.khiva-nukus.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-nukus.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-nukus.drivingDistance',
        prices: [
            { type: 'sedan', price: 54 },
            { type: 'suv', price: 90 },
            { type: 'minivan', price: 135 },
        ],
    },
    {
        id: 'nukus-muynak',
        titleKey: 'privateTransfers.routes.nukus-muynak.title',
        drivingTimeKey: 'privateTransfers.routes.nukus-muynak.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.nukus-muynak.drivingDistance',
        prices: [
            { type: 'sedan', price: 69 },
            { type: 'suv', price: 109 },
            { type: 'minivan', price: 130 },
        ],
    },
    {
        id: 'khiva-muynak',
        titleKey: 'privateTransfers.routes.khiva-muynak.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-muynak.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-muynak.drivingDistance',
        prices: [
            { type: 'sedan', price: 99 },
            { type: 'suv', price: 170 },
            { type: 'minivan', price: 230 },
        ],
    },
    {
        id: 'khiva-bukhara',
        titleKey: 'privateTransfers.routes.khiva-bukhara.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-bukhara.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-bukhara.drivingDistance',
        prices: [
            { type: 'sedan', price: 79 },
            { type: 'suv', price: 135 },
            { type: 'minivan', price: 195 },
        ],
    },
    {
        id: 'nukus-bukhara',
        titleKey: 'privateTransfers.routes.nukus-bukhara.title',
        drivingTimeKey: 'privateTransfers.routes.nukus-bukhara.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.nukus-bukhara.drivingDistance',
        prices: [
            { type: 'sedan', price: 128 },
            { type: 'suv', price: 220 },
            { type: 'minivan', price: 295 },
        ],
    },
    {
        id: 'khiva-samarkand',
        titleKey: 'privateTransfers.routes.khiva-samarkand.title',
        drivingTimeKey: 'privateTransfers.routes.khiva-samarkand.drivingTime',
        drivingDistanceKey: 'privateTransfers.routes.khiva-samarkand.drivingDistance',
        prices: [
            { type: 'sedan', price: 148 },
            { type: 'suv', price: 258 },
            { type: 'minivan', price: 340 },
        ],
    },
];

export const transferVehicleTypes: Record<'sedan' | 'suv' | 'minivan', {nameKey: string, capacityKey: string}> = {
    sedan: {
        nameKey: 'privateTransfers.vehicles.sedan.name',
        capacityKey: 'privateTransfers.vehicles.sedan.capacity',
    },
    suv: {
        nameKey: 'privateTransfers.vehicles.suv.name',
        capacityKey: 'privateTransfers.vehicles.suv.capacity',
    },
    minivan: {
        nameKey: 'privateTransfers.vehicles.minivan.name',
        capacityKey: 'privateTransfers.vehicles.minivan.capacity',
    },
};
