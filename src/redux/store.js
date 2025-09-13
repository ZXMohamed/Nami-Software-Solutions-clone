import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import projectsSlice from "./server state/projects";
import portfolioFilterSlice from "./clint state/portfolio";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [projectsSlice.reducerPath]: projectsSlice.reducer,
        [portfolioFilterSlice.name]: portfolioFilterSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware,languageSlice.middleware,projectsSlice.middleware)
})

export default store;