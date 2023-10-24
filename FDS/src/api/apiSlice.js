import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setRefreshToken, logOut, setAccessToken, selectCurrentToken, selectRsefreshToken } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    // credentials: 'omit',

    prepareHeaders: (headers) => {

        const token = localStorage.getItem('accessToken')
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        //console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshToken = localStorage.getItem('refreshToken')
        // console.log("refresh token :" + refreshToken);

        const data = await fetch('http://127.0.0.1:8000/api/user/refreshlogin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': refreshToken
            })
        }).then(response => {
            //console.log('Response:', response);
            return response.json();
        })
            .then(data => { return data })
            .catch(error => {
                console.error('Error:', error);
            });

        //console.log('Data:', data);
        //Check if we get valid data or not
        if (data?.code === 'token_not_valid') {
            //console.log("No access token found");
            api.dispatch(logOut())
        } else {
            //Store access informations
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    })
})
