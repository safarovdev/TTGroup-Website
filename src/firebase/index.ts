import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';

function initializeFirebase() {
    const apps = getApps();
    let firebaseApp: FirebaseApp;

    if (!apps.length) {
        firebaseApp = initializeApp(firebaseConfig);
    } else {
        firebaseApp = getApp();
    }

    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    return { firebaseApp, auth, firestore };
}


export {
    initializeFirebase,
    FirebaseProvider,
    FirebaseClientProvider,
    useFirebase,
    useFirebaseApp,
    useAuth,
    useFirestore,
    useCollection,
};
