import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import authReducer from '../features/auth/authSlice'
import authSlice from "../features/auth/authSlice"
//import { ClassApi } from "../api/ClassApi"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        //auth: authReducer,
        // [ClassApi.reducerPath]: ClassApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    //  getDefaultMiddleware().concat(ClassApi.middleware),
    devTools: true
})

