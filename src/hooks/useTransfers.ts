'use client';

import { collection, query, where, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Transfer } from '@/lib/transfers';
import { useMemo } from 'react';

export function useTransfers(options?: { isFeatured?: boolean }) {
    const firestore = useFirestore();
    const isFeatured = options?.isFeatured;

    // STEP 1: Always fetch the entire collection.
    const transfersQuery = useMemoFirebase(() => {
        if (!firestore) {
            return null;
        }
        return collection(firestore, 'transfers') as Query<Transfer>;
    }, [firestore]);

    const { data: allTransfers, ...rest } = useCollection<Transfer>(transfersQuery);

    // STEP 2: Perform all filtering and sorting on the client side.
    const processedData = useMemo(() => {
        if (!allTransfers) return null;

        let filtered = allTransfers;

        // Filter by isFeatured if provided
        if (isFeatured === true) {
            filtered = filtered.filter(transfer => transfer.isFeatured === true);
        }

        // Always sort by title
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }, [allTransfers, isFeatured]);

    return { data: processedData, ...rest };
}
