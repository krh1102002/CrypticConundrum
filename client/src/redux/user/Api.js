import axios from "axios";
import { userFail, userRequest, userSuccess } from "./Reducer";

export const signIn = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"POST",
            url:'http://localhost:4000/user/signIn',
            data
        })
        localStorage.setItem('crypticToken',JSON.stringify({token:user.data.user.token}))
        dispatch(userSuccess(user.data.user))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}
export const signUp = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"POST",
            url:'http://localhost:4000/user/signUp',
            data
        })
        localStorage.setItem('crypticToken',JSON.stringify({token:user.data.user.token}))
        dispatch(userSuccess(user.data.user))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}
export const getMySelf = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:'GET',
            url:'http://localhost:4000/user/me'
        })
        dispatch(userSuccess(user.data.user))
    } catch (error) {
        
    }
}
export const getAllUser = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const users = await axios({
            method:"GET",
            url:'http://localhost:4000/user/all'
        })
        dispatch(allUserSuccess(users.data.users))
    } catch (error) {
        
    }
}