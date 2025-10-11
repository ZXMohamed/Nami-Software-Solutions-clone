import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => { return "query/services.php" },
        }),
        getServicesQuestion: builder.query({
            query: () => { return "query/servicesquestions.php" },
        }),
    })
});

export default servicesSlice;
export const { useGetServicesQuery, useGetServicesQuestionQuery} = servicesSlice;