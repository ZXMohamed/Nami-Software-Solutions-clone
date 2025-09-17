import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import servicesSlice from "./services";
import productsSlice from "./products";
import statisticsSlice from "./statistics";
import projectsSlice from "./projects";

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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then(() => {
                        //Manually invalidate services query
                        dispatch(servicesSlice.util.invalidateTags(['ReQueryForMainPage']));
                        dispatch(productsSlice.util.invalidateTags(['ReQueryForMainPage']));
                        dispatch(statisticsSlice.util.invalidateTags(['ReQueryForMainPage']));
                        dispatch(projectsSlice.util.invalidateTags(['ReQueryForMainPage']));
                    });
                } catch (error) {
                    console.error('Language change failed:', error);
                }
            },
        })
    })
})


export default languageSlice;
export const { useLazyGetLanguageQuery, useGetAvailableLanguagesQuery } = languageSlice;