import { configureStore } from "@reduxjs/toolkit";
import imageCashSlice from "./clint state/imagecash";
import languageSlice from "./server state/language";
import requestQuotationSlice from "./server state/requestquotation";
import socialSlice from "./server state/social";
import companyFileSlice from "./server state/companyfile";
import servicesSlice from "./server state/services";
import productsSlice from "./server state/products";
import statisticsSlice from "./server state/statistics";
import projectsSlice from "./server state/projects";
import openJobsSlice from "./server state/openjobs";
import contactSlice from "./server state/contact";
import locationSlice from "./server state/location";
import portfolioFilterSlice from "./clint state/portfolio";

const store = configureStore({
    reducer: {
        [imageCashSlice.name]: imageCashSlice.reducer,
        [socialSlice.reducerPath]: socialSlice.reducer,
        [languageSlice.reducerPath]: languageSlice.reducer,
        [requestQuotationSlice.reducerPath]: requestQuotationSlice.reducer,
        [companyFileSlice.reducerPath]: companyFileSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [statisticsSlice.reducerPath]: statisticsSlice.reducer,
        [projectsSlice.reducerPath]: projectsSlice.reducer,
        [openJobsSlice.reducerPath]: openJobsSlice.reducer,
        [contactSlice.reducerPath]: contactSlice.reducer,
        [locationSlice.reducerPath]: locationSlice.reducer,
        [portfolioFilterSlice.name]: portfolioFilterSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(
        languageSlice.middleware,
        requestQuotationSlice.middleware,
        socialSlice.middleware,
        companyFileSlice.middleware,
        servicesSlice.middleware,
        productsSlice.middleware,
        statisticsSlice.middleware,
        projectsSlice.middleware,
        openJobsSlice.middleware,
        contactSlice.middleware,
        locationSlice.middleware
    )
});

export default store;