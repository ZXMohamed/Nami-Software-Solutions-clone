import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import locationSlice from "./server state/location";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [locationSlice.reducerPath]: locationSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware,locationSlice.middleware,languageSlice.middleware)
})

export default store;