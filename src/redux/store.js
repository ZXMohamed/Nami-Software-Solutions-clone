import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import productsSlice from "./server state/products";

const store = configureStore({
    reducer: {
        [languageSlice.reducerPath]: languageSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat( languageSlice.middleware, productsSlice.middleware )
})

export default store;