import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import locationSlice from "./server state/location";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [locationSlice.reducerPath]: locationSlice.reducer
    },
    middleware: (GDMW) => GDMW().concat(socialSlice.middleware,locationSlice.middleware)
})

export default store;