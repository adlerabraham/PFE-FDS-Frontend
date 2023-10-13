import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken: null, refreshToken: null, group: null },
    reducers: {
        setCredentials: (state, action) => {

            state.refreshToken = action.payload.refresh
            state.accessToken = action.payload.access
            //state.group = action.payload.group; 
            localStorage.setItem('accessToken', action.payload.access);
            localStorage.setItem('refreshToken', action.payload.refresh);
            //localStorage.setItem('group',action.payload.group);
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        logOut: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.group = null;
            localStorage.clear();
        }
    },
    // extraReducers(builder) {
    //     builder.addCase(login.fulfilled, (state, action) => {

    //         state.accessToken = action.payload.access;
    //         state.refreshToken = action.payload.refresh;

    //         localStorage.setItem('accessToken', action.payload.access);
    //         localStorage.setItem('refreshToken', action.payload.refresh);

    //         console.log('AccTo ' + state.accessToken);

    //     })
    // }
})

export const { setCredentials, logOut, setAccessToken } = authSlice.actions

export default authSlice.reducer

export const selectRsefreshToken = (state) => state.auth.refreshToken
export const selectCurrentToken = (state) => state.auth.accessToken
//export const selectCurentUserGroup = (state) => state.auth.group   //retreive group