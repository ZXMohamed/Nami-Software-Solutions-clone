import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import servicesSlice from "./server state/services";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, languageSlice.middleware, servicesSlice.middleware)
})

export default store;