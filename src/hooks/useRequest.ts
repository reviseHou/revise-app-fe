import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useRequest<T>(fetcher: () => Promise<T>, key: string, enabled = true, gcTime?: number) {
  const query = useQuery({ queryKey: [key], queryFn: fetcher, enabled, gcTime })
  const { refetch } = query

  const reload = useCallback(() => {
    void refetch()
  }, [refetch])

  return {
    data: query.data,
    error: query.isFetching ? undefined : (query.error ?? undefined),
    loading: query.data === undefined && query.isFetching,
    reload,
  }
}
