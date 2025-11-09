import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const servicesSlice = createApi({
    reducerPath: "services",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getServices: builder.query({
            query: (params) => { return "query/services.php" + (params?.id ? "?id=" + params.id : "") },
            transformResponse: (response, meta, args) => {
                return args?.id == "all" || !args ? response : response[0];
            }
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
            query: () => { return "query/servicesquestions.php" }
        }),
    })
});

export default servicesSlice;
export const { useGetServicesQuery, useOrderServiceMutation, useGetServicesQuestionQuery} = servicesSlice;
