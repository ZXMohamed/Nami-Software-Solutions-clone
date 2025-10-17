import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import projectsSlice from "./server state/projects";
import portfolioFilterSlice from "./clint state/portfolio";
import socialSlice from "./server state/social";
import imageCashSlice from "./clint state/imagecash";

const store = configureStore({
    reducer: {
        [imageCashSlice.name]: imageCashSlice.reducer,
        [socialSlice.reducerPath]: socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [projectsSlice.reducerPath]: projectsSlice.reducer,
        [portfolioFilterSlice.name]: portfolioFilterSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, languageSlice.middleware, projectsSlice.middleware)
})

export default store;