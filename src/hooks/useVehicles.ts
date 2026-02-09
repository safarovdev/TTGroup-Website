'use client';

import { collection, query, where, documentId, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Vehicle } from '@/lib/vehicles';
import { useMemo } from 'react';

export function useVehicles(options?: { ids?: string[], isFeatured?: boolean }) {
    const firestore = useFirestore();
    const ids = options?.ids;
    const isFeatured = options?.isFeatured;

    const vehiclesQuery = useMemoFirebase(() => {
        if (!firestore) {
            return null;
        }

        const vehiclesCollection = collection(firestore, 'vehicles');
        let q: Query;

        if (ids && ids.length > 0) {
            // Firestore 'in' queries are limited to 30 items.
            q = query(vehiclesCollection, where(documentId(), 'in', ids.slice(0, 30)));
        } else if (isFeatured === true) {
            q = query(vehiclesCollection, where('isFeatured', '==', true));
        } else {
            // Remove order by to avoid needing an index
            q = vehiclesCollection;
        }
        return q as Query<Vehicle>;
    }, [firestore, ids ? JSON.stringify(ids) : 'all', isFeatured]);

    const { data, ...rest } = useCollection<Vehicle>(vehiclesQuery);

    const sortedData = useMemo(() => {
        if (!data) return null;
        // Sort by name if no specific ordering is from the query
        if (!options?.ids && !options?.isFeatured) {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        }
        return data;
    }, [data, options?.ids, options?.isFeatured]);

    return { data: sortedData, ...rest };
}
