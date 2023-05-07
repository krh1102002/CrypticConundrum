import './App.css'
import {Routes,Route, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import { useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import { useDispatch, useSelector } from 'react-redux'
import { getMySelf } from './redux/user/Api'
import LeaderBoard from './pages/LeaderBoard'
import ManagePage from './pages/Manage'

function App() {
  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!user)
      navigate('/auth')
  },[user,navigate])
  useEffect(()=>{
    if(localStorage.crypticToken)
      dispatch(getMySelf())
  },[localStorage])
  
  return (
    <div className='bg-gradient-to-b from-[#201F1F] to-[#2E1310] h-screen w-full overflow-y-auto'>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/manage' element={<ManagePage />} />
      </Routes> */}
      <h1 className='text-gray-500 text-center py-6'>Plzz Register Your self at 10:30 AM We are facing some issues</h1>
    </div>
  )
}

export default App
