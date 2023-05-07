import axios from 'axios'
import { addLevelSuccess, levelDeleteSuccess, levelFail, levelRequest, levelSuccess, updateLevelSuccess } from './Reducer'

export const getAllLevels = () => async(dispatch) =>{
    try {
        dispatch(levelRequest())
        const levels = await axios({
            method:"GET",
            url:"https://wordguessingserver.onrender.com/level/all"
        })
        dispatch(levelSuccess(levels.data.levels))
    } catch (error) {
        dispatch(levelFail(error.response.data.message))
    }
}
export const addLevel = (data) => async(dispatch) =>{
    try {
        dispatch(levelRequest())
        const level = await axios({
            method:"POST",
            url:'https://wordguessingserver.onrender.com/level/create',
            data
        })
        dispatch(addLevelSuccess(level.data.level))
    } catch (error) {
        dispatch(levelFail(error.response.data.message))
    }
}
export const updateLevel = (data) => async(dispatch) =>{
    try {
        dispatch(levelRequest())
        console.log(data)
        await axios({
            method:"PUT",
            url:'https://wordguessingserver.onrender.com/level',
            data
        })
        dispatch(updateLevelSuccess(data))
    } catch (error) {
        dispatch(levelFail(error.response.data.message))
    }
}
export const deleteLevel = (_id) => async(dispatch) =>{
    try {
        await axios({
            method:"DELETE",
            url:"https://wordguessingserver.onrender.com/level",
            data:{_id}
        })
        dispatch(levelDeleteSuccess(_id))
    } catch (error) {
        dispatch(levelFail(error.response.data.message))
    }
}
