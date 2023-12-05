import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken: null, refreshToken: "", group: null, username: null },
    reducers: {
        setCredentials: (state, action) => {

            state.refreshToken = action.payload.refresh
            state.accessToken = action.payload.access
            state.group = action.payload.group
            state.username = action.payload.username

            localStorage.setItem('accessToken', action.payload.access);
            localStorage.setItem('refreshToken', action.payload.refresh);
            localStorage.setItem('group', action.payload.group);
            localStorage.setItem('username', action.payload.username);
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        logOut: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.group = null;
            localStorage.clear();
        }
    },

})

export const { setCredentials, logOut, setAccessToken, setRefreshToken } = authSlice.actions

export default authSlice

export const selectRsefreshToken = (state) => state.auth.refreshToken
export const selectCurrentToken = (state) => state.auth.accessToken
export const selectCurentUserGroup = (state) => state.auth.group   //retreive group