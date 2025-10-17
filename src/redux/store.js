import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import projectsSlice from "./server state/projects";
import imageCashSlice from "./clint state/imagecash";

const store = configureStore({
    reducer: {
        [imageCashSlice.name]: imageCashSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [projectsSlice.reducerPath]: projectsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware, projectsSlice.middleware )
})

export default store;