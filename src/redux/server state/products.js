import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "query/products.php",
            providesTags:['ReQueryForMainPage']
        })
    })

});

export default productsSlice;
export const { useGetProductsQuery } = productsSlice;