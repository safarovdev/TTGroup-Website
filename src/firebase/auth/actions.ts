'use client';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    const auth = getAuth();
    return signOut(auth);
};
