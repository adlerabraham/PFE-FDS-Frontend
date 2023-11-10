import { createSlice } from "@reduxjs/toolkit"
const classTable = [];



const dClassSlice = createSlice({
    name: 'dClass',
    initialState: {
        classInfo: classTable,
        test: "random"
    },
    reducers: {
        setDClasses: (state, action) => {
            state.classInfo.push(action.payload)
            console.log("set class: " + action.payload);
        },
    }
})

export default dClassSlice

export const { setDClasses } = dClassSlice.actions

export const selectLevels = (state) => {
    state.test

}