import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getServices: builder.query({
            query: (params) => { return "query/services.php" + (params?.id ? "?id=" + params.id : "")  },
            providesTags: ['ReQueryForMainPage']
        }),
        orderService: builder.mutation({
            query: (data) => {
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                return {
                    url: "query/orderservice.php",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                }
            }
        }),
        getServicesQuestion: builder.query({
            query: () => { return "query/servicesquestions.php" },
            providesTags: ['ReQueryForMainPage']
        }),
    })
});

export default servicesSlice;
export const { useGetServicesQuery, useOrderServiceMutation, useGetServicesQuestionQuery} = servicesSlice;
