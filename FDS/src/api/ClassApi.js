//import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./apiSlice";

export const ClassApi = apiSlice.injectEndpoints({
    endpoint: builder => ({
        getUser: builder.query({
            query: () => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/course",
                methode: 'GET'
            })
        })
    })
})

export const { useGetUserQuery } = ClassApi

// export const ClassApi = createApi({
//     reducerPath: 'classApiSlice',
//     baseQuery: fetchBaseQuery({
//         baseUrl: "https://dummyjson.com",
//         //baseUrl: "http://127.0.0.1:8000",
//         // prepareHeaders: (headers, { getState }) => {
//         //     const token = getState().auth.token
//         //     if (token) {
//         //         headers.set("authorization", `Bearer ${token}`)
//         //     }
//         //     return headers
//         // }

//     }),
//     endpoints: builder => ({
//         // login: builder.mutation({
//         //     query: credentials => ({
//         //         url: '/api/user/login',
//         //         method: 'POST',
//         //         body: { ...credentials }
//         //     }),
//         //  }),
//         getClass: builder.query({
//             query: () => ({
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 url: "/api/academic/course"
//             })
//             query: () => "/products",
//         }),
//     })
// })

