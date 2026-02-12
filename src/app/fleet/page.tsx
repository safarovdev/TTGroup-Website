'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { vehicleCategoryMap, type Vehicle } from '@/lib/vehicles';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { VehicleCard } from '@/components/vehicle-card';
import { ArrowUpDown, X } from 'lucide-react';
import { useVehicles } from '@/hooks/useVehicles';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const FleetPage = () => {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');
    
    type VehicleSortOption = 'order' | 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc';
    const [sortOption, setSortOption] = useState<VehicleSortOption>('priceAsc');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
    const { data: vehicles, loading } = useVehicles();
    
    const categories = Object.keys(vehicleCategoryMap) as Array<keyof typeof vehicleCategoryMap>;

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
    };

    const sortedAndFilteredVehicles = useMemo(() => {
        if (!vehicles) return [];
        let processed = [...vehicles]; 

        if (selectedCategories.length > 0) {
            processed = processed.filter(vehicle => selectedCategories.includes(vehicle.category));
        }
        
        switch (sortOption) {
            case 'priceAsc':
                processed.sort((a, b) => (a.price > 0 ? a.price : Infinity) - (b.price > 0 ? b.price : Infinity));
                break;
            case 'priceDesc':
                processed.sort((a, b) => b.price - a.price);
                break;
            case 'nameAsc':
                processed.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDesc':
                processed.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'order':
            default:
                 processed.sort((a, b) => {
                    const orderA = a.displayOrder ?? 999;
                    const orderB = b.displayOrder ?? 999;
                    if (orderA !== orderB) {
                        return orderA - orderB;
                    }
                    return a.name.localeCompare(b.name);
                });
                break;
        }

        return processed;
    }, [vehicles, selectedCategories, sortOption]);


    const VehicleGridSkeleton = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 bg-card p-4 rounded-xl">
                    <Skeleton className="h-[225px] w-full rounded-lg" />
                    <div className="space-y-3 pt-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full mt-4" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <Header />
            <main className="flex-grow py-12 md:py-20">
                <div className="container">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('fleetPage.title')}</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            {t('fleetPage.description')}
                        </p>
                    </div>

                    <Card className="p-4 md:p-6 mb-8 md:mb-12">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                            <h3 className="text-xl font-bold">{t('fleetPage.filters.title')}</h3>
                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className='w-full md:w-auto'>
                                        <ArrowUpDown className="mr-2 h-4 w-4" />
                                        {t('fleetPage.filters.sortBy')}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuRadioGroup value={sortOption} onValueChange={(v) => setSortOption(v as VehicleSortOption)}>
                                            <DropdownMenuRadioItem value="order">{t('fleetPage.filters.sortOptions.order')}</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="priceAsc">{t('fleetPage.filters.sortOptions.priceAsc')}</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="priceDesc">{t('fleetPage.filters.sortOptions.priceDesc')}</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="nameAsc">{t('fleetPage.filters.sortOptions.nameAsc')}</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="nameDesc">{t('fleetPage.filters.sortOptions.nameDesc')}</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {selectedCategories.length > 0 && (
                                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                                        {t('fleetPage.filters.clear')}
                                        <X className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
                            {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={category}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={() => handleCategoryChange(category)}
                                        className="h-5 w-5 rounded"
                                    />
                                    <Label htmlFor={category} className="text-base font-medium cursor-pointer">
                                        {t(`vehicleCategories.${category}`)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </Card>


                    {/* Vehicle Grid */}
                    <div>
                        {loading ? (
                            <VehicleGridSkeleton />
                        ) : sortedAndFilteredVehicles && sortedAndFilteredVehicles.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedAndFilteredVehicles.map((vehicle, index) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 3} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-xl">
                                <h3 className="text-2xl font-bold tracking-tight">{t('fleetPage.filters.noResultsTitle')}</h3>
                                <p className="mt-3 text-muted-foreground max-w-sm">
                                    {t('fleetPage.filters.noResultsDescription')}
                                </p>
                                <Button onClick={clearFilters} className="mt-6">
                                    {t('fleetPage.filters.clear')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FleetPage;
