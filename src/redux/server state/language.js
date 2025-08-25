import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const languageSlice = createApi({
    reducerPath: "language",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getAvailableLanguages: builder.query({
            query: () =>"/query/availableLanguage.php"
        }),
        getLanguage: builder.mutation({
            query: ({language, page }) => ({
                url: "query/language.php?lang=" + language + "&" + "page=" + page,
                method: "GET",
            })
        })
    })
})


export default languageSlice;
export const { useGetLanguageMutation, useGetAvailableLanguagesQuery } = languageSlice;