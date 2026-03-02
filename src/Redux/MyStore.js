import { configureStore } from "@reduxjs/toolkit";
import { getApiCall } from "./GetApiCall";
import { setupListeners } from "@reduxjs/toolkit/query";

const MyStore = configureStore({
    reducer: {
        [getApiCall.reducerPath]: getApiCall.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getApiCall.middleware),
})

setupListeners(MyStore.dispatch)

export default MyStore;