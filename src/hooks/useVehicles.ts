'use client';

import { collection, query, where, orderBy, documentId, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Vehicle } from '@/lib/vehicles';

export function useVehicles(options?: { ids?: string[] }) {
    const firestore = useFirestore();
    const ids = options?.ids;

    const vehiclesQuery = useMemoFirebase(() => {
        if (!firestore) {
            return null;
        }

        const vehiclesCollection = collection(firestore, 'vehicles');
        let q: Query;

        if (ids && ids.length > 0) {
            // Firestore 'in' queries are limited to 30 items.
            q = query(vehiclesCollection, where(documentId(), 'in', ids.slice(0, 30)));
        } else {
            q = query(vehiclesCollection, orderBy('name'));
        }
        return q as Query<Vehicle>;
    }, [firestore, ids ? JSON.stringify(ids) : 'all']);

    return useCollection<Vehicle>(vehiclesQuery);
}
