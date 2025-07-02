import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import servicesSlice from "./server state/services";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [servicesSlice.reducerPath]: servicesSlice.reducer
    },
    middleware: (GDMW) => GDMW().concat(socialSlice.middleware,servicesSlice.middleware)
})

export default store;