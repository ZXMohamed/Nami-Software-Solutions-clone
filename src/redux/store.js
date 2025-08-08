import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import servicesSlice from "./server state/services";

const store = configureStore({
    reducer: {
        [languageSlice.reducerPath]: languageSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware, servicesSlice.middleware)
})

export default store;