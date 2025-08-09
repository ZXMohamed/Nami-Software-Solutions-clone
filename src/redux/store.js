import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import requestQuotationSlice from "./server state/requestquotation";
import socialSlice from "./server state/social";
import companyFileSlice from "./server state/companyfile";
import servicesSlice from "./server state/services";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [requestQuotationSlice.reducerPath]: requestQuotationSlice.reducer,
        [companyFileSlice.reducerPath]: companyFileSlice.reducer,
        [servicesSlice.reducerPath]:servicesSlice.reducer,
        
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware, requestQuotationSlice.middleware, socialSlice.middleware, companyFileSlice.middleware, servicesSlice.middleware)
})

export default store;