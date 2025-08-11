import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";

const store = configureStore({
    reducer: {
        [languageSlice.reducerPath] : languageSlice.reducer,
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware)
})

export default store;