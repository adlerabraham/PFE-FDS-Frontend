import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import authReducer from '../features/auth/authSlice'
import authSlice from "../features/auth/authSlice"
import dClassSlice from "../features/DataSlices/DClassSlice"
//import { ClassApi } from "../api/ClassApi"

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    dClass: dClassSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

