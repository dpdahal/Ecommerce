import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userSliceApi} from "./reducers/userSlice";
import {authSliceApi} from "./reducers/authSlice";
import {categorySliceApi} from "./reducers/categorySlice";

export const store = configureStore({
    reducer: {
        [userSliceApi.reducerPath]: userSliceApi.reducer,
        [authSliceApi.reducerPath]: authSliceApi.reducer,
        [categorySliceApi.reducerPath]: categorySliceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userSliceApi.middleware,
            authSliceApi.middleware,
            categorySliceApi.middleware,
        ),

});

setupListeners(store.dispatch);