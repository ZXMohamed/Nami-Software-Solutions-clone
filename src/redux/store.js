import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import projectsSlice from "./server state/projects";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [projectsSlice.reducerPath]: projectsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware,languageSlice.middleware,projectsSlice.middleware)
})

export default store;