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
                
                return `${endpointName}-${queryArgs.cat || ''}`
            },
            merge: (currentCache, newItems, { arg }) => {
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