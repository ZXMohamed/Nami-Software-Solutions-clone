import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const languageSlice = createApi({
    reducerPath: "language",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
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
            query: ({ language }) => {

                const params = new URLSearchParams();
                
                params.append("lang",language);
                
                return {
                    url: "query/currentLanguage.php",
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


export default languageSlice;
export const { useLazyGetLanguageQuery, useGetAvailableLanguagesQuery, useSetCurrentLanguageMutation } = languageSlice;