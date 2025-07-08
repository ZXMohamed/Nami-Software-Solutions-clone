import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import companyFileSlice from "./server state/companyfile";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [companyFileSlice.reducerPath]: companyFileSlice.reducer,
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, companyFileSlice.middleware)
})

export default store;