import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Custom hook for real-time Firestore content syncing.
 * Supports listening to a single document or the entire collection.
 * 
 * @param section Optional section ID (document ID in website_content). If omitted, listens to all sections.
 * @param fallback Default data to return if document doesn't exist.
 */
export function useRealTimeContent<T>(section?: string, fallback?: T) {
  const [data, setData] = useState<T | Record<string, any> | null>(fallback || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    if (section) {
      // Listen to a specific section document
      const docRef = doc(db, 'website_content', section);
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.data() as T);
          } else if (fallback) {
            setData(fallback);
          }
          setLoading(false);
        },
        (err) => {
          console.error(`Error syncing section ${section}:`, err);
          setError(err);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      // Listen to the entire collection
      const colRef = collection(db, 'website_content');
      const q = query(colRef);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const allContent: Record<string, any> = {};
          snapshot.forEach((doc) => {
            allContent[doc.id] = doc.data();
          });
          setData(allContent);
          setLoading(false);
        },
        (err) => {
          console.error('Error syncing website_content collection:', err);
          setError(err);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    }
  }, [section]);

  return { data, loading, error };
}
