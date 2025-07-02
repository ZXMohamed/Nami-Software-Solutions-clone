import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationSlice = createApi({
    reducerPath:"location",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getlocation: builder.query({
            query: () => "query/location.php"
        })
    })
})

export default locationSlice;
export const { useGetlocationQuery } = locationSlice;