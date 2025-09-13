import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsSlice = createApi({
    reducerPath: "projects",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://192.168.1.100:443/nami-clone-data-api/",
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getProjectsByCat: builder.query({
            query: ({ cat, count, reset, search }) => "/query/projects.php?cat=" + cat + "&" + "count=" + count + "&" + (reset ? "reset=1" : "") + "&" + (search ? "search=" + search : ""),
            providesTags: ['ReQueryForMainPage']
        }),
        getNextProjectsByCat: builder.query({
            query: ({ cat, count, reset, search }) => "/query/projects.php?cat=" + cat + "&" + "count=" + count + "&" + (reset ? "reset=1" : "") + "&" + (search ? "search=" + search : ""),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                // Cache key should include search + cat, but ignore count (page)
                return `${endpointName}-${queryArgs.cat || ''}`//-${queryArgs.search || ''}-${queryArgs.reset || ''}-${queryArgs.cat || ''}`;
            },
            //Refetch when the page arg changes
            // forceRefetch({ currentArg, previousArg }) {
            //     return currentArg !== previousArg
            // },
            merge: (currentCache, newItems, { arg }) => {
                console.log("ssss=>", currentCache, newItems);
                
                // if (arg.reset) {
                //     // Start fresh if reset
                //     return newItems;
                // }

                // Ensure currentCache is an array before spreading
                return {...(currentCache || {}), ...newItems};
            },
            providesTags: ['ReQueryForMainPage']
        }),
        getCategories: builder.query({
            query: ()=>"/query/portfoliocategory.php",
            providesTags: ['ReQueryForMainPage']
        })
    })
})


export default projectsSlice;
export const { useGetProjectsByCatQuery, useGetCategoriesQuery, useLazyGetNextProjectsByCatQuery } = projectsSlice;