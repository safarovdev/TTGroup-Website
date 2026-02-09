'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Transfer } from '@/lib/transfers';

export function useTransfers(options?: { isFeatured?: boolean }) {
    const firestore = useFirestore();
    const [allTransfers, setAllTransfers] = useState<Transfer[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    const isFeatured = options?.isFeatured;

    useEffect(() => {
        if (!firestore) {
            // Firestore is not yet available, wait.
            return;
        }

        const fetchTransfers = async () => {
            setLoading(true);
            try {
                const transfersRef = collection(firestore, 'transfers');
                const querySnapshot = await getDocs(transfersRef);
                const transfersData = querySnapshot.docs.map(doc => ({ ...doc.data() as Transfer, id: doc.id }));
                setAllTransfers(transfersData);
                setError(null);
            } catch (e: any) {
                console.error("Error fetching transfers:", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchTransfers();

    }, [firestore]); // Only re-run when firestore instance changes

    const processedData = useMemo(() => {
        if (!allTransfers) return null;

        let filtered = allTransfers;

        // Filter by isFeatured if provided
        if (isFeatured === true) {
            filtered = filtered.filter(transfer => transfer.isFeatured === true);
        }

        // Always sort by title
        return [...filtered].sort((a, b) => a.title_ru.localeCompare(b.title_ru));
    }, [allTransfers, isFeatured]);

    return { data: processedData, loading, error };
}
