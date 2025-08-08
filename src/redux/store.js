import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import openJobsSlice from "./server state/openjobs";

const store = configureStore({
    reducer: {
        [languageSlice.reducerPath]: languageSlice.reducer,
        [openJobsSlice.reducerPath]: openJobsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware, openJobsSlice.middleware)
})

export default store;