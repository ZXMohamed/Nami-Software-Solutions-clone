import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "./server state/social";

const store = configureStore({
    reducer: {
        [socialSlice.reducerPath] : socialSlice.reducer
    },
    middleware: (GDMW) => GDMW().concat(socialSlice.middleware)
})

export default store;