import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => { return "query/services.php" },
            providesTags: ['ReQueryForMainPage']
        })
    })
});

export default servicesSlice;
export const { useGetServicesQuery} = servicesSlice;