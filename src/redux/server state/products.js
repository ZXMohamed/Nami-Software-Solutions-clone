import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () =>"query/products.php"
        })
    })

});

export default productsSlice;
export const { useGetProductsQuery } = productsSlice;