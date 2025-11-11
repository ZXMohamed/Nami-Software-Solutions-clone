import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsSlice = createApi({
    reducerPath: "projects",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getProjectsByCat: builder.query({
            query: ({ cat, count, reset, search }) => "/query/projects.php?cat=" + cat + "&" + "count=" + count + "&" + (reset ? "reset=1" : "") + "&" + (search ? "search=" + search : ""),
        }),
        getNextProjectsByCat: builder.query({
            query: ({ cat, count, reset, search }) => "/query/projects.php?cat=" + cat + "&" + "count=" + count + "&" + (reset ? "reset=1" : "") + "&" + (search ? "search=" + search : ""),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                //* Cache key should include cat, but ignore count, search (page)
                return `${endpointName}-${queryArgs.cat || ''}`;
            },
            merge: (currentCache, newItems, { arg }) => {

                //* Ensure currentCache is an array before spreading
                return {
                    error: newItems.error,
                    data: [...(currentCache.data || []), ...newItems.data]
                }
            },
        }),
        getCategories: builder.query({
            query: () => "/query/portfoliocategory.php",
        }),
        getProjectById: builder.query({
            query: ({ id }) => "/query/projects.php?id=" + id
        })
    })
})


export default projectsSlice;
export const { useGetProjectsByCatQuery, useGetCategoriesQuery, useLazyGetNextProjectsByCatQuery, useGetProjectByIdQuery } = projectsSlice;
