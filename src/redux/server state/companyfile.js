import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyFileSlice = createApi({
    reducerPath: "companyfile",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getCompanyFile: builder.query({
            query: () => "query/companyfile.php"
        })
    })
})

export default companyFileSlice;
export const { useGetCompanyFileQuery } = companyFileSlice;