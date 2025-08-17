import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
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