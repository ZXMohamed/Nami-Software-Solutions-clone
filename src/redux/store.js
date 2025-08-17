import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import servicesSlice from "./server state/services";
import socialSlice from "./server state/social";


const store = configureStore({
    reducer: {
        [languageSlice.reducerPath]: languageSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer,
        [socialSlice.reducerPath]:socialSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat( languageSlice.middleware, servicesSlice.middleware, socialSlice.middleware )
})

export default store;