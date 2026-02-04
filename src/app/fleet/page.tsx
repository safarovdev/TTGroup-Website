'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Vehicles, vehicleCategoryMap } from '@/lib/vehicles';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { VehicleCard } from '@/components/vehicle-card';
import { ListFilter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


const FleetPage = () => {
    const { t } = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
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

    const filteredVehicles = selectedCategories.length > 0
        ? Vehicles.filter(vehicle => selectedCategories.includes(vehicle.category))
        : Vehicles;

    const FilterControls = () => (
         <aside className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{t('fleetPage.filters.title')}</h3>
                {selectedCategories.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                        {t('fleetPage.filters.clear')}
                        <X className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
            <div className="space-y-4">
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
        </aside>
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

                    <div className="grid md:grid-cols-12 md:gap-12">
                        {/* Desktop Filters */}
                        <div className="hidden md:block md:col-span-3">
                            <div className="sticky top-24">
                                <FilterControls />
                            </div>
                        </div>
                        
                        {/* Mobile Filters */}
                        <div className="md:hidden mb-8 flex items-center justify-between">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">
                                        <ListFilter className="w-5 h-5 mr-2" />
                                        {t('fleetPage.filters.title')}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-4/5">
                                    <div className="p-4 pt-12">
                                     <FilterControls />
                                    </div>
                                </SheetContent>
                            </Sheet>
                             <p className="text-sm text-muted-foreground font-medium">
                                {t('fleetPage.filters.found', { count: filteredVehicles.length })}
                             </p>
                        </div>


                        {/* Vehicle Grid */}
                        <div className="md:col-span-9">
                            {filteredVehicles.length > 0 ? (
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredVehicles.map((vehicle) => (
                                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FleetPage;
