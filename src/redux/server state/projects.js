import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsSlice = createApi({
    reducerPath: "projects",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.1.100/nami-clone-data-api/"
    }),
    endpoints: (builder) => ({
        getProjectsByCat: builder.query({
            query: ({cat, count}) => "/query/projects.php?cat=" + cat + "&" + "count=" + count,
        })
    })
})


export default projectsSlice;
export const { useGetProjectsByCatQuery } = projectsSlice;