import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const statisticsSlice = createApi({
    reducerPath: "statistics",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () =>"query/statistics.php"
        })
    })
})

export default statisticsSlice;
export const { useGetStatisticsQuery } = statisticsSlice;