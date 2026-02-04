'use client';

import { doc, setDoc, collection, type Firestore } from 'firebase/firestore';
import type { Vehicle } from '@/lib/vehicles';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

// Helper to create a slug from a string
function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

/**
 * Adds a new vehicle to the 'vehicles' collection in Firestore.
 * The document ID is automatically generated from the vehicle name.
 * @param firestore - The Firestore instance.
 * @param vehicleData - The vehicle data, excluding the 'id'.
 * @returns The generated ID of the new vehicle document.
 */
export function addVehicle(firestore: Firestore, vehicleData: Omit<Vehicle, 'id'>): string {
    const slug = createSlug(vehicleData.name);
    if (!slug) {
        throw new Error('Vehicle name is invalid for generating an ID.');
    }
    const id = `fleet-${slug}`;
    
    // Create a reference to the new document.
    const vehicleRef = doc(firestore, 'vehicles', id);
    
    const dataToSet = { ...vehicleData, id };

    // Use setDoc to create the document.
    // We don't await this promise on the client to allow for optimistic updates.
    setDoc(vehicleRef, dataToSet)
        .catch(async (serverError) => {
            console.error("Firestore write error:", serverError);
            const permissionError = new FirestorePermissionError({
                path: vehicleRef.path,
                operation: 'create',
                requestResourceData: dataToSet,
            });
            // Emit a centralized error for debugging, e.g., in development.
            errorEmitter.emit('permission-error', permissionError);
        });
    
    return id;
}
