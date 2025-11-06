import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationSlice = createApi({
    reducerPath:"location",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: () => "query/location.php"
        })
    })
})

export default locationSlice;
export const { useGetLocationQuery } = locationSlice;