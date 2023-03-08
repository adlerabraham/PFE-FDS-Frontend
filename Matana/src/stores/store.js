import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { loginSlice } from '../features/loginSlice'

export const store = configureStore({
    reducer: {
        loginInfos: loginSlice.reducer
    }
    //middleware: [thunk, logger]
});

