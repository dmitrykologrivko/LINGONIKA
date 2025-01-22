import { UseQueryResult } from '@tanstack/react-query';

export function useQueriesState(queries: UseQueryResult[]) {
  const isDisabledQuery = (result: UseQueryResult) => {
    // Detect if query is disabled by checking if it is neither loading nor fetching
    return result.isPending && !result.isLoading && !result.isFetching && result.data === undefined && !result.error;
  }
  const filterEnabledQueries = (results: UseQueryResult[]) =>
    results.filter(result => !isDisabledQuery(result));

  return {
    isLoading: queries.some(q => q.isLoading),
    isFetching: queries.some(q => q.isFetching),
    isFetched: filterEnabledQueries(queries).every(q => q.isFetched),
    isSuccess: filterEnabledQueries(queries).every(q => q.isSuccess),
    isError: queries.some(q => q.isError),
    firstError: queries.filter(q => q.isError).map(q => q.error)[0],
    errors: queries.filter(q => q.isError).map(q => q.error),
    data: queries.map((q) => q.data),
    dataByIndex: function<T>(index: number): T | undefined {
      return queries[index].data as T;
    },
    results: queries,
    referch: () => {
      filterEnabledQueries(queries).forEach(result => {
        if (result.refetch) {
          result.refetch();
        }
      });
    }
  };
}
