import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import locationSlice from "./server state/location";
import contactSlice from "./server state/contact";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [locationSlice.reducerPath]: locationSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer,
        [contactSlice.reducerPath] : contactSlice.reducer,
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware,locationSlice.middleware,languageSlice.middleware,contactSlice.middleware)
})

export default store;