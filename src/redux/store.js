import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import openJobsSlice from "./server state/openjobs";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [openJobsSlice.reducerPath]: openJobsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, openJobsSlice.middleware)
})

export default store;