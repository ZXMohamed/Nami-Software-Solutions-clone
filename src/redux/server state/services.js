import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/nami-clone-data-api/" }),
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () =>"query/services.php"
        })
    })
});

export default servicesSlice;
export const { useGetServicesQuery} = servicesSlice;