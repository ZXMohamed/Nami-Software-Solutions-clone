import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./server state/language";
import requestQuotationSlice from "./server state/requestquotation";
import socialSlice from "./server state/social";
import companyFileSlice from "./server state/companyfile";
import servicesSlice from "./server state/services";
import productsSlice from "./server state/products";
import statisticsSlice from "./server state/statistics";
import projectsSlice from "./server state/projects";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [requestQuotationSlice.reducerPath]: requestQuotationSlice.reducer,
        [companyFileSlice.reducerPath]: companyFileSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [statisticsSlice.reducerPath]: statisticsSlice.reducer,
        [projectsSlice.reducerPath]:projectsSlice.reducer,
        
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(languageSlice.middleware, requestQuotationSlice.middleware, socialSlice.middleware, companyFileSlice.middleware, servicesSlice.middleware, productsSlice.middleware, statisticsSlice.middleware, projectsSlice.middleware )
})

export default store;