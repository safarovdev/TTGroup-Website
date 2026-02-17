import { type MetadataRoute } from 'next';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';
import { type Vehicle } from '@/lib/vehicles';

// Function to initialize Firebase and get Firestore instance
const getDb = () => {
    if (!getApps().length) {
        // In a server-side context like sitemap generation, we initialize a new app instance.
        return getFirestore(initializeApp(firebaseConfig, 'sitemap-generator'));
    }
    // If it's already initialized for some reason, get the default instance.
    return getFirestore(getApp());
};


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://triptransfers.uz/sitemap.xml';
  
  let vehiclePages: MetadataRoute.Sitemap = [];

  try {
    const db = getDb();
    const vehiclesCollection = collection(db, 'vehicles');
    const vehiclesSnapshot = await getDocs(vehiclesCollection);
    vehiclePages = vehiclesSnapshot.docs.map((doc) => {
        const vehicleId = doc.id;
        return {
        url: `${siteUrl}/fleet/${vehicleId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        };
    });
  } catch (error) {
      console.error("Error fetching vehicles for sitemap:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/transfers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [
    ...staticPages,
    ...vehiclePages,
  ];
}
