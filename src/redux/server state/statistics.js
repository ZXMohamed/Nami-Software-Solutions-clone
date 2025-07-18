import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const statisticsSlice = createApi({
    reducerPath: "statistics",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost/nami-clone-data-api/"
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => "query/statistics.php",
            providesTags: ['ReQueryForMainPage']
        })
    })
})

export default statisticsSlice;
export const { useGetStatisticsQuery } = statisticsSlice;