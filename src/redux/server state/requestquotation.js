import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const requestQuotationSlice = createApi({
    reducerPath: "requestQuotation",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        requestQuotation: builder.mutation({
            query: (data) => {
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                return {
                    url: "query/requestquotation.php",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                }
            }
        })
    })
})


export default requestQuotationSlice;
export const { useRequestQuotationMutation } = requestQuotationSlice;