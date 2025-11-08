import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const socialSlice = createApi({
    reducerPath: "social",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        getSocial: builder.query({
            query: () => "query/social.php"
        })
    })
})


export default socialSlice;
export const { useGetSocialQuery } = socialSlice;