import { useQuery, useInfiniteQuery as useReactInfiniteQuery, useMutation } from "react-query"

export const useInfiniteQuery = (key, fn, params = {}) => {
  const { data, ...props } = useReactInfiniteQuery(key, fn, {
    getNextPageParam: (lastPage, pages) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
    staleTime: 60 * 10000, // 1 minute
    ...params,
  })

  let allData = null
  if (data) {
    allData = [].concat.apply(
      [],
      data.pages.map((page) => page.profiles),
    )
    // const alldata = concat([], data.pages.map(page => page.profiles))
    console.log("alldata")
    console.log(allData)
  }

  return { data, allData, ...props }
}
