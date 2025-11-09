import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: (params) => "query/products.php" + (params?.id ? "?id=" + params.id : ""),
        }),
        orderProduct: builder.mutation({
            query: (data) => {
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                return {
                    url: "query/orderproduct.php",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                }
            }
        }),
    })

});


export default productsSlice;
export const { useGetProductsQuery, useOrderProductMutation } = productsSlice;
