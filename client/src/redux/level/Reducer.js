import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    levels : [],
    loading: false,
    error: ""
}
const updateLevel = (level,levels) =>{
    const updatedLevels = levels.map((lev) =>{
        if(lev._id === level._id)
            return level
        return lev;
    })
    return updatedLevels;
}
const levelSlice = createSlice({
    name:"level",
    initialState,
    reducers:{
        levelRequest:(state)=>{
            state.loading = true
            state.error = ""
        },
        levelSuccess:(state,action)=>{
            state.loading = false
            let sortedLevels = action.payload.sort((a,b) => a.level - b.level)
            state.levels = sortedLevels
        },
        addLevelSuccess:(state,action)=>{
            state.loading = false
            state.levels.push(action.payload)
            let sortedLevels = current(state.levels).sort((a,b) => a.level - b.level)
            state.levels = sortedLevels
        },
        updateLevelSuccess:(state,action)=>{
            state.loading = false
            const levels = updateLevel(action.payload,current(state.levels))
            let sortedLevels = levels.sort((a,b) => a.level - b.level)
            state.levels = sortedLevels
        },
        levelDeleteSuccess:(state,action) =>{
            state.loading = false
            let levels = current(state.levels)
            state.levels = levels.filter((level) => level._id !== action.payload)
        },
        levelFail:(state,action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {levelRequest,levelSuccess,addLevelSuccess,updateLevelSuccess,levelFail,levelDeleteSuccess} = levelSlice.actions

export default levelSlice.reducer