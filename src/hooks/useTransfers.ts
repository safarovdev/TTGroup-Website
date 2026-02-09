'use client';

import { collection, query, where, orderBy, type Query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Transfer } from '@/lib/transfers';

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
            q = query(transfersCollection, where('isFeatured', '==', true), orderBy('title'));
        } else {
            q = query(transfersCollection, orderBy('title'));
        }
        return q as Query<Transfer>;
    }, [firestore, isFeatured]);

    return useCollection<Transfer>(transfersQuery);
}
