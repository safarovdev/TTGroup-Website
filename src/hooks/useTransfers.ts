'use client';

import { collection, query, where, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Transfer } from '@/lib/transfers';
import { useMemo } from 'react';

export function useTransfers(options?: { isFeatured?: boolean }) {
    const firestore = useFirestore();
    const isFeatured = options?.isFeatured;

    const transfersQuery = useMemoFirebase(() => {
        if (!firestore) {
            return null;
        }

        const transfersCollection = collection(firestore, 'transfers');
        let q: Query;

        if (isFeatured === true) {
            // Remove orderBy to avoid needing a composite index
            q = query(transfersCollection, where('isFeatured', '==', true));
        } else {
            // Remove orderBy to avoid needing an index
            q = collection(firestore, 'transfers');
        }
        return q as Query<Transfer>;
    }, [firestore, isFeatured]);

    const { data, ...rest } = useCollection<Transfer>(transfersQuery);

    const sortedData = useMemo(() => {
        if (!data) return null;
        // Sort by title client-side
        return [...data].sort((a, b) => a.title.localeCompare(b.title));
    }, [data]);

    return { data: sortedData, ...rest };
}
