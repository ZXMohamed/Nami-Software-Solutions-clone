import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import languageSlice from "./server state/language";
import companyFileSlice from "./server state/companyfile";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer,
        [languageSlice.reducerPath] : languageSlice.reducer,
        [companyFileSlice.reducerPath]: companyFileSlice.reducer
    },
    
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware, languageSlice.middleware, companyFileSlice.middleware)
})

export default store;