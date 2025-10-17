import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import socialSlice from "./server state/social";
import productsSlice from "./server state/products";
import imageCashSlice from "./clint state/imagecash";

const store = configureStore({
    reducer: {
        [imageCashSlice.name]: imageCashSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [socialSlice.reducerPath]: socialSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat( languageSlice.middleware, productsSlice.middleware, socialSlice.middleware )
})

export default store;