import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { getAllUser } from '../redux/user/Api'

function LeaderBoard() {
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getAllUser())
    },[])
  return (
    <div className='text-white'>
      <Navbar />
      LeaderBoard
    </div>
  )
}

export default LeaderBoard
