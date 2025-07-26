import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const openJobsSlice = createApi({
    reducerPath: "openjobs",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://192.168.1.100:443/nami-clone-data-api/"
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
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded',
                    // },
                    body: formData,
                }
            }
        })
    })
})

export default openJobsSlice;
export const { useGetOpenJobsQuery,useRequestJobMutation } = openJobsSlice;