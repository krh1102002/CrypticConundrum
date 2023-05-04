import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    user:undefined,
    allUsers:[],
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
        userSuccess:(state,action) =>{
            state.loading = false,
            state.user = action.payload
            state.error = ""
        },
        allUserSuccess:(state,action) =>{
            state.loading = false,
            state.allUsers = action.payload
            state.error = ""
        },
        userFail:(state,action) =>{
            state.loading = false,
            state.error = action.payload
        }
    }
})
export const {userRequest,userSuccess,allUserSuccess,userFail} = userSlice.actions

export default userSlice.reducer
