import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    user:undefined,
    userLevel:undefined,
    allUsers:[],
    currLevels:[],
    error:""
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userRequest:(state) =>{
            state.loading = true
            state.error = ""
        },
        clearError:(state) =>{
            state.loading = false,
            state.error = ""
        },
        clearUser:(state) =>{
            state.user = undefined
        },
        setUserLevel:(state,action) =>{
            state.userLevel = action.payload
            state.loading = false;
        },
        setUserAttempt:(state,action) =>{
            state.user.attempt = action.payload
        },
        setCurrLevel:(state,action) =>{
            state.currLevels = action.payload
        },
        userSuccess:(state,action) =>{
            state.loading = false,
            
            state.user = action.payload
            state.error = ""
        },
        allUserSuccess:(state,action) =>{
            state.loading = false
            let users = action.payload.sort((a,b) => b.level-a.level)
            state.allUsers = users
            state.error = ""
        },
        userFail:(state,action) =>{
            state.loading = false,
            state.error = action.payload
        }
    }
})
export const {userRequest,clearError,setUserAttempt,userSuccess,setCurrLevel,setUserLevel,allUserSuccess,clearUser,userFail} = userSlice.actions

export default userSlice.reducer
