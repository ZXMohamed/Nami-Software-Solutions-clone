import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const socialSlice = createApi({
    reducerPath: "social",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://192.168.1.100:443/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getSocial: builder.query({
            query: () => "query/social.php"
        })
    })
})


export default socialSlice;
export const { useGetSocialQuery } = socialSlice;