'use client';
    
import { useState, useEffect } from 'react';
import {
  DocumentReference,
  getDoc,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to fetch a single Firestore document.
 * It performs a one-time fetch instead of subscribing to real-time updates.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The Firestore DocumentReference. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  docRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!docRef) {
      setIsLoading(false);
      setData(null);
      return;
    }

    const fetchDoc = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData({ ...(docSnap.data() as T), id: docSnap.id });
            } else {
                setData(null);
            }
        } catch (e: any) {
            const contextualError = new FirestorePermissionError({
                operation: 'get',
                path: docRef.path,
            });
            setError(contextualError);
            setData(null);
            errorEmitter.emit('permission-error', contextualError);
        } finally {
            setIsLoading(false);
        }
    };

    fetchDoc();
    
  }, [docRef]);

  return { data, isLoading, error };
}
