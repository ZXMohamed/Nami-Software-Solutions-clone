import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import servicesSlice from "./server state/services";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware)
})

export default store;