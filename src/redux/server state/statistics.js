import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const statisticsSlice = createApi({
    reducerPath: "statistics",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => "query/statistics.php"
        })
    })
})

export default statisticsSlice;
export const { useGetStatisticsQuery } = statisticsSlice;