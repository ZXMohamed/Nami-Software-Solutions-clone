import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyFileSlice = createApi({
    reducerPath: "companyfile",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getCompanyFile: builder.query({
            query: () => "query/companyfile.php"
        })
    })
})

export default companyFileSlice;
export const { useGetCompanyFileQuery } = companyFileSlice;