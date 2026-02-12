'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Vehicle } from '@/lib/vehicles';

export function useVehicles(options?: { ids?: string[], isFeatured?: boolean }) {
    const firestore = useFirestore();
    const [allVehicles, setAllVehicles] = useState<Vehicle[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        if (!firestore) {
            // Firestore is not yet available, wait.
            return;
        }

        setLoading(true);
        const vehiclesRef = collection(firestore, 'vehicles');
        
        const unsubscribe = onSnapshot(vehiclesRef, (querySnapshot) => {
            const vehiclesData = querySnapshot.docs.map(doc => ({ ...doc.data() as Vehicle, id: doc.id }));
            setAllVehicles(vehiclesData);
            setError(null);
            setLoading(false);
        }, (e: any) => {
            console.error("Error fetching vehicles:", e);
            setError(e);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();

    }, [firestore]); // Only re-run when firestore instance changes

    const processedData = useMemo(() => {
        if (!allVehicles) return null;

        let filtered = allVehicles;
        const ids = options?.ids;
        const isFeatured = options?.isFeatured;

        // Filter by IDs if provided
        if (ids && ids.length > 0) {
            const idSet = new Set(ids);
            filtered = filtered.filter(vehicle => idSet.has(vehicle.id));
        }

        // Filter by isFeatured if provided
        if (isFeatured === true) {
            filtered = filtered.filter(vehicle => vehicle.isFeatured === true);
        }
        
        // Default sort by displayOrder, then by name as a fallback.
        // This is the default order that the consuming component will receive.
        if (!ids) {
            return [...filtered].sort((a, b) => {
                const orderA = a.displayOrder ?? 999;
                const orderB = b.displayOrder ?? 999;
                if (orderA !== orderB) {
                    return orderA - orderB;
                }
                return a.name.localeCompare(b.name);
            });
        }

        return filtered;
    }, [allVehicles, options?.ids, options?.isFeatured]);

    return { data: processedData, loading, error };
}
