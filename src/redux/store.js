import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer
    },
    middleware: (reduxMiddleWare) => reduxMiddleWare().concat(socialSlice.middleware)
})

export default store;