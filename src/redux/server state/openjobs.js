import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const openJobsSlice = createApi({
    reducerPath: "openjobs",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        getOpenJobs: builder.query({
            query: () =>"query/openjobs.php"
        }),
        requestJob: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                for (const key in data) {
                    formData.append(key, data[key]);
                }
                return {
                    url: "query/requestjob.php",
                    method: "POST",
                    body: formData,
                }
            }
        })
    })
})

export default openJobsSlice;
export const { useGetOpenJobsQuery,useRequestJobMutation } = openJobsSlice;