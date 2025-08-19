import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import productsSlice from "./products";

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
        getLanguage: builder.mutation({
            query: ({language, page }) => ({
                url: "query/language.php?lang=" + language + "&" + "page=" + page,
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then(() => {
                        //Manually invalidate services query
                        dispatch(productsSlice.util.invalidateTags(['ReQueryForMainPage']));
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