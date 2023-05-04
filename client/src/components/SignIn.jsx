import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {AiFillLock} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../redux/user/Api'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isSigning,setIsSigning] = useState(false)
    const [errorData,setError] = useState("")

    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault()
        setIsSigning(true)
        dispatch(signIn({email,password}))
        setEmail("")
        setPassword("")
    }
    const {user,error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() =>{
        setIsSigning(false)
        if(user)
            navigate("/")
    },[user,error])
    
  return (
    <Box className='w-full h-[420px] flex flex-col gap-6 justify-center items-center'>
        <div className='flex flex-col gap-1 items-center justify-center text-white'>
            <span className='text-4xl'><AiFillLock /></span>
            <h1 className='text-2xl font-semibold font-serif'>Sign In</h1>
        </div>
      <form action="" className='flex flex-col gap-6 w-full' onSubmit={handleSubmit}>
        <Box className='flex gap-1 flex-col text-white'>
            <label htmlFor="email" className='text-sm font-semibold'>Enter your email</label>
            <input 
                type="email" 
                name="" 
                id="email"
                value={email} 
                placeholder='johndeo@gmail.com'
                required
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-2 rounded-lg'
            />
        </Box>
        <Box className='flex gap-1 flex-col text-white'>
            <label htmlFor="password" className='text-sm font-semibold'>Enter your password</label>
            <input 
                type="password" 
                name="" 
                id="password" 
                value={password}
                placeholder='password'
                required
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border bg-transparent text-white focus:outline-none px-4 py-2 rounded-lg'
            />
        </Box>
        <Box className='mt-6'>
            <input type="submit" value={`${isSigning?'Signing...':'Sign In'}`}  className={`w-full py-2 border rounded-full cursor-pointer text-white hover:bg-[#1e1818] transition-all duration-200 ${isSigning?'opacity-50 cursor-not-allowed hover:bg-inherit':''}`}/>
        </Box>
      </form>
    </Box>
  )
}

export default SignIn
