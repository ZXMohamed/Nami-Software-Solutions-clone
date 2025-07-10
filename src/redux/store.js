import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";
import locationSlice from "./server state/location";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath]: socialSlice.reducer,
        [locationSlice.reducerPath]: locationSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware)
})

export default store;