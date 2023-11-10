import { createSlice } from "@reduxjs/toolkit"

const dClassSlice = createSlice({
    name: 'dClass',
    initialState: {
        classInfo: [],
        test: "Random"
    },
    reducers: {
        setDClasses: (state, action) => {

        },
    },

})

export const { setDClasses, getClassInfo } = dClassSlice.actions

export default dClassSlice

export const selectLevels = (state) => state.dClass.test