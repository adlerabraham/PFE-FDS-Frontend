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
        getSudents: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/student/?course_id=" + params.classId + "&period_id=" +
                    params.periodID + "&level_id=" + params.levelID,
                methode: 'GET'
            })
        }),
        getNoteCardList: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "note/transcript/?course_id=" + params.classId + "&period_id=" +
                    params.periodID + "&level_id=" + params.levelID,
                methode: 'GET'
            })
        }),
    })
})

export const {
    useLoginMutation,
    useGetClassQuery,
    useGetSudentsQuery,
    useGetNoteCardListQuery,
} = authApiSlice