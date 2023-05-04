import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../redux/user/Api'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [year,setYear] = useState("")
    const [prn,setPrn] = useState("")
    const [isSigning,setIsSigning] = useState(false)
    
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault()
        setIsSigning(true)
        const data = {
            name,email,password,year:Number(year),prn
        }
        dispatch(signUp(data))
        setName("")
        setEmail("")
        setPassword("")
        setYear("")
        setPrn("")

    }
    const {user,error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() =>{
        setIsSigning(false)
        if(user)
            navigate("/")
    },[user,error])
  return (
    <div className='w-full h-[420px] '>
        <h1 className='text-xl font-semibold text-center text-white'>Sign Up</h1>
      <form action="" className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
      <div className='flex gap-1 flex-col text-white w-full'>
            <label htmlFor="name" className='text-sm font-semibold'>Enter your Name</label>
            <input 
                type="text" 
                name="" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='John Deo'
                required
                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-1 rounded-lg'
            />
        </div>
        <div className='flex gap-1 flex-col text-white'>
            <label htmlFor="email" className='text-sm font-semibold'>Enter your email</label>
            <input 
                type="email" 
                name="" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='johndeo@gmail.com'
                required
                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-1 rounded-lg'
            />        
        </div>
        <div className='flex gap-1 flex-col text-white'>
            <label htmlFor="prn" className='text-sm font-semibold'>Enter your prn</label>
            <input 
                type="text" 
                name="" 
                id="prn"
                value={prn}
                onChange={(e) => setPrn(e.target.value)}
                placeholder='prn'
                required
                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-1 rounded-lg'
            />
        </div>
        <div className='flex gap-1 flex-col text-white'>
            <label htmlFor="email" className='text-sm font-semibold'>Select your year</label>
            <select  className='w-full border bg-transparent text-white focus:outline-none px-4 py-1 rounded-lg' value={year}  onChange={(e)=>setYear(e.target.value)} required>
                <option selected className='bg-[#1e1818] text-white'>Select Year</option>
                <option value="1" className='bg-[#1e1818] text-white'>1</option>
                <option value="2" className='bg-[#1e1818] text-white'>2</option>
                <option value="3" className='bg-[#1e1818] text-white'>3</option>
                <option value="4" className='bg-[#1e1818] text-white'>4</option>
            </select>
        </div>
        <div className='flex gap-1 flex-col text-white'>
            <label htmlFor="password" className='text-sm font-semibold'>Enter your password</label>
            <input 
                type="password" 
                name="" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required
                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-1 rounded-lg'
            />
        </div>
        <div className='mt-3'>
            <input type="submit" value={`${isSigning?'Signing...':'Sign Up'}`}  className={`w-full py-2 border rounded-full cursor-pointer text-white hover:bg-[#1e1818] transition-all duration-200 ${isSigning?'opacity-50 cursor-not-allowed hover:bg-inherit':''}`}/>
        </div>
      </form>
    </div>
  )
}

export default SignUp
