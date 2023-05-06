import axios from "axios";
import { allUserSuccess, userFail, userRequest, userSuccess,clearUser, setUserAttempt } from "./Reducer";

export const signIn = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"POST",
            url:'http://localhost:4000/user/signIn',
            data
        })
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.user.token}`
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
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.user.token}`
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
        dispatch(userFail(error.response.data.message))
    }
}
export const logout = () => async(dispatch) =>{
    try {
        localStorage.removeItem('crypticToken')
        dispatch(clearUser())
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}
export const updateUser = (level) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"PUT",
            url:'http://localhost:4000/user/update',
            data:{level}
        })
        dispatch(userSuccess(user.data.user))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}
export const updateAttempt = (attempt) => async(dispatch) =>{
    try {
        // dispatch(userRequest())
        await axios({
            method:"PUT",
            url:'http://localhost:4000/user/updateAttempt',
            data:{attempt}
        })
        dispatch(setUserAttempt(attempt))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
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
        dispatch(userFail(error.response.data.message))
    }
}