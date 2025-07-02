import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import productsSlice from "./server state/products";
import statisticsSlice from "./server state/statistics";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [statisticsSlice.reducerPath]: statisticsSlice.reducer
    },
    middleware: (GDMW) => GDMW().concat(socialSlice.middleware,productsSlice.middleware,statisticsSlice.middleware)
})

export default store;