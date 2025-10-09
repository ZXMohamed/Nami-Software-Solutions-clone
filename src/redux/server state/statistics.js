import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const statisticsSlice = createApi({
    reducerPath: "statistics",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => "query/statistics.php",
        })
    })
})

export default statisticsSlice;
export const { useGetStatisticsQuery } = statisticsSlice;