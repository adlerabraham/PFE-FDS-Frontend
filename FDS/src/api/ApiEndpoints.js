import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        getClass: builder.query({
            query: () => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/course",
                methode: 'GET'
            })
        }),
    })
})

export const {
    useLoginMutation,
    useGetClassQuery,
} = authApiSlice