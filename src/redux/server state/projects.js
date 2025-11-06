import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsSlice = createApi({
    reducerPath: "projects",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['ReQueryForMainPage'],
    endpoints: (builder) => ({
        getProjectsByCat: builder.query({
            query: ({cat, count}) => "/query/projects.php?cat=" + cat + "&" + "count=" + count,
            providesTags: ['ReQueryForMainPage']
        }),
        getProjectById: builder.query({
            query: ({ id }) => "/query/projects.php?id=" + id,
            providesTags: ['ReQueryForMainPage']
        })
    })
})


export default projectsSlice;
export const { useGetProjectsByCatQuery, useGetProjectByIdQuery } = projectsSlice;