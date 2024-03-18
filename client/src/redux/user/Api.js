import axios from "axios";
import { allUserSuccess, userFail, userRequest, userSuccess,clearUser, setUserAttempt } from "./Reducer";

export const signIn = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"POST",
            url:'https://wordguessingserver.onrender.com/user/signIn',
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
            url:'https://wordguessingserver.onrender.com/user/signUp',
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
            url:'https://wordguessingserver.onrender.com/user/me'
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
export const updateUser = ({level,time}) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const user = await axios({
            method:"PUT",
            url:'https://wordguessingserver.onrender.com/user/update',
            data:{level,time}
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
            url:'https://wordguessingserver.onrender.com/user/updateAttempt',
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
            url:'https://wordguessingserver.onrender.com/user/all'
        })
        dispatch(allUserSuccess(users.data.users))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}