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
        //CRUD operation for the grades
        getStudentGrades: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "note/grade/?transcript_id=" + params.examenID,
                methode: 'GET'
            }),
            providesTags: ['grades']
        }),
        createGrades: builder.mutation({
            query: (params) => ({
                url: 'note/first-entry-temp/create/?transcript_id=' + params.transcriptID,
                method: 'POST',
                body: { ...params.gradeList }
            }),
            invalidatesTags: ['grades']
        }),
        updateGrades: builder.mutation({
            query: (params) => ({
                url: 'note/first-entry-temp/update/?transcript_id=' + params.transcriptID,
                method: 'PUT',
                body: { ...params.gradeList }
            }),
            invalidatesTags: ['grades']
        }),
        submitTranscipt: builder.mutation({
            query: (params) => ({
                url: 'note/first-entry-temp/submission/?transcript_id=' + params.transcriptID,
                method: 'PUT'
            }),
            invalidatesTags: ['transcriptStatus']
        }),
        //*****Coordinator endpoints****
        getPrograms: builder.query({
            query: () => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/coordinator/program",
                methode: 'GET'
            })
        }),
        getLevels: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/coordinator/program/level/?program_id=" + params.programID,
                methode: 'GET'
            })
        }),
        getCourses: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: "academic/coordinator/program/level/course/?program_id=" + params.programID
                    + "&level_id=" + params.levelID,
                methode: 'GET'
            })
        }),
        updateSecondEntry: builder.mutation({
            query: (params) => ({
                url: 'note/second-entry-temp/update/?transcript_id=' + params.transcriptID,
                method: 'PUT',
                body: { ...params.gradeList }
            }),
            invalidatesTags: ['grades']
        }),
        getTranscriptStatus: builder.query({
            query: (params) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: `note/transcript/status/?transcript_id=${params.transcriptID}`,
                methode: 'GET'
            }),
            providesTags: ['transcriptStatus']
        }),
        validateTranscript: builder.mutation({
            query: (params) => ({
                url: 'note/grade/validation/?transcript_id=' + params.transcriptID,
                method: 'PUT',
            }),
            invalidatesTags: ['transcriptStatus']
        }),
        cancelSubmission: builder.mutation({
            query: (params) => ({
                url: 'note/first-entry-temp/submission/cancel/?transcript_id=' + params.transcriptID,
                method: 'PUT',
            }),
            invalidatesTags: ['transcriptStatus']
        }),
    })
})

export const {
    useLoginMutation,
    useGetClassQuery,
    useGetSudentsQuery,
    useGetNoteCardListQuery,
    useGetStudentGradesQuery,
    useCreateGradesMutation,
    useUpdateGradesMutation,
    useGetProgramsQuery,
    useGetLevelsQuery,
    useGetCoursesQuery,
    useUpdateSecondEntryMutation,
    useSubmitTransciptMutation,
    useGetTranscriptStatusQuery,
    useValidateTranscriptMutation,
    useCancelSubmissionMutation,
} = authApiSlice