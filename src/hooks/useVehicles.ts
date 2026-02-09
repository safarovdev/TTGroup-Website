'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Vehicle } from '@/lib/vehicles';

export function useVehicles(options?: { ids?: string[], isFeatured?: boolean }) {
    const firestore = useFirestore();
    const [allVehicles, setAllVehicles] = useState<Vehicle[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    const ids = options?.ids;
    const isFeatured = options?.isFeatured;

    useEffect(() => {
        if (!firestore) {
            // Firestore is not yet available, wait.
            return;
        }

        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const vehiclesRef = collection(firestore, 'vehicles');
                const querySnapshot = await getDocs(vehiclesRef);
                const vehiclesData = querySnapshot.docs.map(doc => ({ ...doc.data() as Vehicle, id: doc.id }));
                setAllVehicles(vehiclesData);
                setError(null);
            } catch (e: any) {
                console.error("Error fetching vehicles:", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();

    }, [firestore]); // Only re-run when firestore instance changes

    const processedData = useMemo(() => {
        if (!allVehicles) return null;

        let filtered = allVehicles;

        // Filter by IDs if provided
        if (ids && ids.length > 0) {
            const idSet = new Set(ids);
            filtered = filtered.filter(vehicle => idSet.has(vehicle.id));
        }

        // Filter by isFeatured if provided
        if (isFeatured === true) {
            filtered = filtered.filter(vehicle => vehicle.isFeatured === true);
        }
        
        // Default sort by name if no specific ID order is given
        if (!ids) {
            return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    }, [allVehicles, ids ? JSON.stringify(ids) : 'all', isFeatured]);

    return { data: processedData, loading, error };
}
