'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export interface UseCollectionData<T> {
  data: (T & { id: string })[] | null;
  loading: boolean;
  error: Error | null;
}

export function useCollection<T extends DocumentData>(
  query: Query<T> | null
): UseCollectionData<T> {
  const [data, setData] = useState<(T & { id: string })[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ ...(doc.data() as T), id: doc.id })
        );
        setData(docs);
        setLoading(false);
        setError(null);
      },
      (serverError) => {
        // Attempt to get path from query, falling back to a generic message.
        const path = (query as any)?._query?.path?.segments?.join('/') || 'unknown path';

        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
