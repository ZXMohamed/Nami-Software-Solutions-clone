import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/nami-clone-data-api/",
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => { console.log("ddddd"); return "query/services.php" },
            providesTags: ['ReQueryForMainPage']
        })
    })
});

export default servicesSlice;
export const { useGetServicesQuery} = servicesSlice;