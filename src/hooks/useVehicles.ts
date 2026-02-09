'use client';

import { collection, query, where, documentId, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Vehicle } from '@/lib/vehicles';
import { useMemo } from 'react';

export function useVehicles(options?: { ids?: string[], isFeatured?: boolean }) {
    const firestore = useFirestore();
    const ids = options?.ids;
    const isFeatured = options?.isFeatured;

    // STEP 1: Always fetch the entire collection. This avoids needing any specific indexes.
    const vehiclesQuery = useMemoFirebase(() => {
        if (!firestore) {
            return null;
        }
        return collection(firestore, 'vehicles') as Query<Vehicle>;
    }, [firestore]);

    const { data: allVehicles, ...rest } = useCollection<Vehicle>(vehiclesQuery);

    // STEP 2: Perform all filtering and sorting on the client side.
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

    return { data: processedData, ...rest };
}
