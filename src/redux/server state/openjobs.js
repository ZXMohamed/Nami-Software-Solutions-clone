import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const openJobsSlice = createApi({
    reducerPath: "openjobs",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getOpenJobs: builder.query({
            query: () =>"query/openjobs.php"
        })
    })
})

export default openJobsSlice;
export const { useGetOpenJobsQuery } = openJobsSlice;