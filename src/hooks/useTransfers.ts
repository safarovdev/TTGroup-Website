'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Transfer } from '@/lib/transfers';

export function useTransfers(options?: { isFeatured?: boolean }) {
    const firestore = useFirestore();
    const [allTransfers, setAllTransfers] = useState<Transfer[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        if (!firestore) {
            // Firestore is not yet available, wait.
            return;
        }

        setLoading(true);
        const transfersRef = collection(firestore, 'transfers');

        const unsubscribe = onSnapshot(transfersRef, (querySnapshot) => {
            const transfersData = querySnapshot.docs.map(doc => ({ ...doc.data() as Transfer, id: doc.id }));
            setAllTransfers(transfersData);
            setError(null);
            setLoading(false);
        }, (e: any) => {
            console.error("Error fetching transfers:", e);
            setError(e);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();

    }, [firestore]); // Only re-run when firestore instance changes

    const processedData = useMemo(() => {
        if (!allTransfers) return null;

        let filtered = allTransfers;
        const isFeatured = options?.isFeatured;

        // Filter by isFeatured if provided
        if (isFeatured === true) {
            filtered = filtered.filter(transfer => transfer.isFeatured === true);
        }

        // Sort by displayOrder, then by title as a fallback
        return [...filtered].sort((a, b) => {
            const orderA = a.displayOrder ?? 999;
            const orderB = b.displayOrder ?? 999;
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return a.title_ru.localeCompare(b.title_ru);
        });
    }, [allTransfers, options?.isFeatured]);

    return { data: processedData, loading, error };
}
