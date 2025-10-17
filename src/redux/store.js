import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import productsSlice from "./server state/products";
import socialSlice from "./server state/social";
import statisticsSlice from "./server state/statistics";
import imageCashSlice from "./clint state/imagecash";

const store = configureStore({
    reducer: {
        [imageCashSlice.name] : imageCashSlice.reducer,
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [statisticsSlice.reducerPath]: statisticsSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(statisticsSlice.middleware, languageSlice.middleware, productsSlice.middleware, socialSlice.middleware)
})

export default store;