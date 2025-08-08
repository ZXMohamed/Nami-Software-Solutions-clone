import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import productsSlice from "./server state/products";
import statisticsSlice from "./server state/statistics";

const store = configureStore({
    reducer: {
        [languageSlice.reducerPath] : languageSlice.reducer,
        [productsSlice.reducerPath] : productsSlice.reducer,
        [statisticsSlice.reducerPath] : statisticsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat( languageSlice.middleware, productsSlice.middleware, statisticsSlice.middleware)
})

export default store;