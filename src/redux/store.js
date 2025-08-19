import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import requestQuotationSlice from "./server state/requestquotation";
import socialSlice from "./server state/social";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer,
        [requestQuotationSlice.reducerPath] : requestQuotationSlice.reducer,
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, languageSlice.middleware, requestQuotationSlice.middleware)
})

export default store;