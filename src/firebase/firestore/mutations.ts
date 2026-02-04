'use client';

import { doc, setDoc, type Firestore, deleteDoc, updateDoc } from 'firebase/firestore';
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

type VehicleFormData = Omit<Vehicle, 'id'>;

/**
 * Adds a new vehicle to the 'vehicles' collection in Firestore.
 * The document ID is automatically generated from the vehicle name.
 * @param firestore - The Firestore instance.
 * @param vehicleData - The vehicle data, excluding the 'id'.
 */
export function addVehicle(firestore: Firestore, vehicleData: VehicleFormData) {
    const slug = createSlug(vehicleData.name);
    if (!slug) {
        console.error("Vehicle name is invalid for generating an ID.");
        return;
    }
    const id = `fleet-${slug}-${Date.now()}`; // Add timestamp for uniqueness
    
    const vehicleRef = doc(firestore, 'vehicles', id);
    const dataToSet = { ...vehicleData, id };

    setDoc(vehicleRef, dataToSet)
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: vehicleRef.path,
                operation: 'create',
                requestResourceData: dataToSet,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
}

/**
 * Updates an existing vehicle in the 'vehicles' collection.
 * @param firestore - The Firestore instance.
 * @param vehicleId - The ID of the vehicle document to update.
 * @param vehicleData - The new data for the vehicle.
 */
export function updateVehicle(firestore: Firestore, vehicleId: string, vehicleData: VehicleFormData) {
    const vehicleRef = doc(firestore, 'vehicles', vehicleId);
    
    updateDoc(vehicleRef, vehicleData)
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: vehicleRef.path,
                operation: 'update',
                requestResourceData: vehicleData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
}

/**
 * Deletes a vehicle from the 'vehicles' collection.
 * @param firestore - The Firestore instance.
 * @param vehicleId - The ID of the vehicle document to delete.
 */
export function deleteVehicle(firestore: Firestore, vehicleId: string) {
    const vehicleRef = doc(firestore, 'vehicles', vehicleId);
    
    deleteDoc(vehicleRef)
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: vehicleRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
}
