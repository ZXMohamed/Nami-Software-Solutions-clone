import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import productsSlice from "./products";
import statisticsSlice from "./statistics";

const languageSlice = createApi({
    reducerPath: "language",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getAvailableLanguages: builder.query({
            query: () =>"/query/availableLanguage.php"
        }),
        getLanguage: builder.mutation({
            query: ( language, page ) => ({
                url: "query/language.php?lang=" + language + "&" + "page=" + page,
                method: "GET",
                credentials: 'include'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then(() => {
                        //Manually invalidate services query
                        dispatch(() => {
                            
                            productsSlice.util.invalidateTags(['ReQueryForMainPage'])
                            statisticsSlice.util.invalidateTags(['ReQueryForMainPage'])
                        }
                        );
                    });
                } catch (error) {
                    console.error('Language change failed:', error);
                }
            },
        })
    })
})


export default languageSlice;
export const { useGetLanguageMutation, useGetAvailableLanguagesQuery } = languageSlice;