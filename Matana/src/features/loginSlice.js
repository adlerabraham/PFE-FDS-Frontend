import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    accessToken: null,
    refreshToken: null,
    status: 'iddle',
    isLoading: false,
    isAuthenticated: false,
    msg: null
}

export const login = createAsyncThunk(
    'login',
    async (credentials) => {

        const res = await axios.post('http://127.0.0.1:8000/api/user/login', credentials);
        console.log('test', res);

        return res.data;
        // const res = await fetch("http://127.0.0.1:8000/api/user/login", {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // })
        // console.log('test', res);
        // return await res.json();

    }
);

export const loginSlice = createSlice({
    name: "loginInfos",
    initialState,
    reducers: {
        addAccessToken: (state, action) => {
            state.accessToken = localStorage.getItem('accessToken');
        },
        addRefreshToken: (state, action) => {
            state.accessToken = localStorage.getItem('refreshToken');
        },
        logout: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.clear();
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state, action) => {
            state.status = 'Pending';
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.isLoading = false;
                state.isAuthenticated = true;

                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;

                localStorage.setItem('accessToken', action.payload.access);
                localStorage.setItem('refreshToken', action.payload.refresh);

            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'Faild';
                state.isLoading = false;
                state.isAuthenticated = false;
                state.msg = action.error.message;

            })
    }
})


export const { addAccessToken, addRefreshToken, logOut } = loginSlice.actions;

export default loginSlice.reducer

