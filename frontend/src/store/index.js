import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userSliceApi} from "./reducers/userSlice";
import {authSliceApi} from "./reducers/authSlice";
import {categorySliceApi} from "./reducers/categorySlice";
import {productSliceApi} from "./reducers/productSlice";
import {orderSliceApi} from "./reducers/orderSlice";

export const store = configureStore({
    reducer: {
        [userSliceApi.reducerPath]: userSliceApi.reducer,
        [authSliceApi.reducerPath]: authSliceApi.reducer,
        [categorySliceApi.reducerPath]: categorySliceApi.reducer,
        [productSliceApi.reducerPath]: productSliceApi.reducer,
        [orderSliceApi.reducerPath]: orderSliceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userSliceApi.middleware,
            authSliceApi.middleware,
            categorySliceApi.middleware,
            productSliceApi.middleware,
            orderSliceApi.middleware,
        ),

});

setupListeners(store.dispatch);