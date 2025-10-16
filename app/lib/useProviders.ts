import useSWR from "swr";

type ProvidersResponse = { data: any[] };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProviders() {
  const { data, isLoading, mutate, error } = useSWR<ProvidersResponse>(
    "/api/providers",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    rows: data?.data ?? [],
    isLoading,
    mutate,
    error,
  };
}
