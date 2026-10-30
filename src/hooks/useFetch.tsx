import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getRequest() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Could not fetch data");
        }

        const data: T = await response.json();
        if (!signal.aborted) {
          setData(data);
        }
      } catch (err: any) {
        if (err.name === "AbortError" || signal.aborted) {
          return;
        }
        setError(
          err instanceof Error ? err : new Error("An unknown error occured."),
        );
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getRequest();

    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isLoading, error };
}
