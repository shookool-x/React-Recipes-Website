import { useEffect, useState } from "react";
import { FoodItem } from "../models/Interfaces";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export function useCollection(collectionNAme: string) {

  const [collectionData, setCollectionData] = useState<FoodItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    setIsLoading(true);

    const ref = collection(db, collectionNAme);
    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError('No Item To Show');
        setIsLoading(false);
      } else {
        const result: FoodItem[] = [];

        snapshot.docs.forEach(doc => {

          const fooditem: FoodItem = {
            id: doc.id,
            title: doc.data().title || '',
            ingredients: doc.data().ingredients || [],
            method: doc.data().method || '',
            cookingTime: doc.data().cookingTime || '',
          }
          result.push(fooditem);
        })
        setCollectionData(result);
        setIsLoading(false);
      }
    })


    return () => unsub();
  }, [collectionNAme])

  return { collectionData, isLoading, error }
}