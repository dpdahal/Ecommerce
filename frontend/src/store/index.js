import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userSliceApi} from "./reducers/userSlice";
import {authSliceApi} from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        [userSliceApi.reducerPath]: userSliceApi.reducer,
        [authSliceApi.reducerPath]: authSliceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userSliceApi.middleware, authSliceApi.middleware),

});

setupListeners(store.dispatch);