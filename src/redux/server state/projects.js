import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(import.meta.env.VITE_API_URL);
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
                
                return `${endpointName}-${queryArgs.cat || ''}`
            },
            merge: (currentCache, newItems, { arg }) => {
                return {...(currentCache || {}), ...newItems};
            },
        }),
        getCategories: builder.query({
            query: ()=>"/query/portfoliocategory.php",
        })
    })
})


export default projectsSlice;
export const { useGetProjectsByCatQuery, useGetCategoriesQuery, useLazyGetNextProjectsByCatQuery } = projectsSlice;