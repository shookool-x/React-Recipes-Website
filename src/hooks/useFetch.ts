import { useState, useEffect } from 'react';
import { FoodItem, FoodNoId } from '../models/Interfaces';

export default function useFetch<T extends FoodItem[]>(url: string, method = 'GET') {

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<RequestInit | null>(null);

  const postData = (data: FoodNoId) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  useEffect(() => {
    console.log(url);
    async function fetchData(fetchOption?: RequestInit) {

      try {
        const response = await fetch(url, { ...fetchOption });
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const json = await response.json();
        console.log(json);
        setData(json);
        setError(null);
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setIsLoading(false);
      }
    }
    if (method === 'GET') {
      const timer = setTimeout(() => {
        fetchData();
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (method === 'POST' && options) {
      fetchData(options)
    }

  }, [url, method, options])

  return { data, error, isLoading, postData }
}
