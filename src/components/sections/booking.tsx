"use client";

import { useOnScreen } from "@/hooks/use-on-screen";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { useVehicles } from "@/hooks/useVehicles";

function BookingSectionContent() {
    const searchParams = useSearchParams();
    const { data: vehicles } = useVehicles();
    const [vehicleName, setVehicleName] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        const vehicleId = searchParams.get('vehicle');
        if (vehicleId && vehicles && vehicles.length > 0) {
            const vehicle = vehicles.find(v => v.id === vehicleId);
            if (vehicle) {
                setVehicleName(vehicle.name);
                setTimeout(() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    }, [searchParams, vehicles]);

    return <BookingForm variant="inverted" defaultVehicleName={vehicleName} />;
}


export function Booking() {
    const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
    const { t } = useTranslation();

    return (
        <section ref={ref} id="booking" className="py-20 md:py-28 bg-primary text-primary-foreground">
            <div className="container">
                <div className={cn("text-center max-w-3xl mx-auto mb-12", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('booking.title')}</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">
                        {t('booking.description')}
                    </p>
                </div>
                <div className={cn("max-w-3xl mx-auto", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
                     <Suspense fallback={<div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                        <BookingSectionContent />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
