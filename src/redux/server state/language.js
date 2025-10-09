import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const languageSlice = createApi({
    reducerPath: "language",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getAvailableLanguages: builder.query({
            query: () =>"/query/availableLanguage.php"
        }),
        getLanguage: builder.query({
            query: ({ language, page }) => "query/language.php?lang=" + language + "&" + "page=" + page,
        }),
        setCurrentLanguage: builder.mutation({
            query: ({ language }) => "query/currentLanguage.php?lang=" + language,
        })
    })
})


export default languageSlice;
export const { useLazyGetLanguageQuery, useGetAvailableLanguagesQuery, useSetCurrentLanguageMutation } = languageSlice;