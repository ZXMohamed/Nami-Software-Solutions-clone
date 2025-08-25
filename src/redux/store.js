import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import socialSlice from "./server state/social";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer,
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, languageSlice.middleware)
})

export default store;