import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationSlice = createApi({
    reducerPath:"location",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://192.168.1.100:443/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: () => "query/location.php"
        })
    })
})

export default locationSlice;
export const { useGetLocationQuery } = locationSlice;