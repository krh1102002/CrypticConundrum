import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { getAllLevels } from '../redux/level/Api';
import Navbar from '../components/Navbar';
import { setCurrLevel, setUserLevel } from '../redux/user/Reducer';
import { updateAttempt, updateUser } from '../redux/user/Api';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomPage() {
    const [isCorrect, setIsCorrect] = React.useState(true)
    const [guessCorrect, setGuessCorrect] = React.useState(false)
    const [word, setWord] = React.useState("")
    
    const { user, userLevel, loading, currLevels } = useSelector((state) => state.user)
    const { levels } = useSelector((state) => state.level)
    
    const dispatch = useDispatch()

    const range = (start, end, step) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }
    React.useEffect(() => {        
        if(localStorage.crypticToken)
            dispatch(getAllLevels())
    }, [])

    let s, e;
    const navigate = useNavigate()
    React.useEffect(() => {
        if (user?.isAdmin) {
            navigate('/manage')
        }
    }, [])
    React.useEffect(() => {
        if (user?.isAdmin) {
            navigate('/manage')
        }
        if (user && levels?.length > 0) {
            if (user.level <= 8) {
                s = 1;
                if ((s + 7) <= levels.length)
                    e = s + 7;
                else
                    e = levels.length
            }
            else {
                if (user.level % 8 == 0) {
                    s = (Math.floor(user.level / 8) - 1) * 8 + 1;
                    if ((s + 7) >= levels.length)
                        e = s + 7;
                    else
                        e = levels.length
                }
                else {
                    s = (Math.floor(user.level / 8) * 8) + 1;
                    if ((s + 7) >= levels.length)
                        e = s + 7;
                    else
                        e = levels.length
                }
            }
            const arr = range(s, e + 1, 1)
            dispatch(setCurrLevel(arr))
        }
        if (user?.level && levels.length > 0) {
            let data = levels.find((lev) => lev.level === user.level)
            dispatch(setUserLevel(data))
        }
    }, [user?.level, levels])
    const handleSubmit = () => {
        if (word.toUpperCase() === userLevel?.word) {
            setGuessCorrect(true)
            setWord("")
            setTimeout(() => {
                setGuessCorrect(false)
            }, [2000])
            setIsCorrect(true)
            dispatch(updateUser({level:user.level+1,time:Date.now()}))
            
        } else {
            setIsCorrect(false)
            setWord("")
            setTimeout(() => {
                setIsCorrect(true)
            }, [4000])
        }
        // dispatch(updateAttempt(user.attempt + 1))       
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center h-full w-full'>
                <ReactLoading type={'spin'} color={'white'} height={'30px'} width={'30px'} />
            </div>
        )
    }
    return (
        <div className='text-white'>
            <Navbar />
            {!isCorrect && <div className='absolute top-5 left-5 z-10'>
                <Alert severity="error">Wrong Guess</Alert>
            </div>}
            {guessCorrect && <div className='absolute top-5 left-5 z-10'>
                <Alert severity="success">Correct Guess</Alert>
            </div>}
            <div className='sm:hidden flex justify-center py-2'>
                {currLevels?.length > 0 && userLevel && <div className='flex gap-1.5'>
                    {currLevels.map((e,index) => (
                        <div key={index} className={`text-white  ${user?.level === e ? 'bg-[#295725]' : 'bg-[#383434] '} ${user.level > e ? ' bg-green-600 ' : ''} px-1.5 py-2 rounded-lg`}>
                            <span>Lv {e}</span>
                        </div>
                    ))}
                </div>}
            </div>
            {!userLevel && <h2 className='text-gray-300 text-center text-lg font-semibold py-4'>Level <span className='text-[#295725]'>{user?.level}</span> Not Added</h2>}
            {userLevel && <div className='flex w-full h-full justify-around items-center py-6'>

                <div className='flex flex-col md:gap-8 gap-4'>

                    <div className='flex md:gap-8 gap-4 flex-col items-center'>
                        <h1 className='px-6 font-semibold md:text-xl text-base py-1'>Guess The Word From Image</h1>
                        <a href={userLevel?.image} target='_blank'>
                            <img src={userLevel?.image} alt={userLevel?._id} className='w-40 h-40 rounded-full overflow-hidden' draggable='false' />
                        </a>
                        <div className='w-full'>
                            <input
                                type="text"
                                name=""
                                id="name"
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                placeholder='Enter correct word'
                                className='w-full border  bg-transparent text-white focus:outline-none px-4 py-2 rounded-lg' />
                        </div>
                        {/* <div className='flex gap-4 items-center'>
                            {userLevel.alterWord.split("").map((char) => (
                                <span className='bg-green-500 text-white py-2 px-3 rounded'>{char}</span>
                            ))}
                        </div> */}
                    </div>
                    <div className='flex justify-end gap-4'>
                        <button className='bg-[#295725] px-4 py-2 rounded font-semibold' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

                {currLevels?.length > 0 && <div className='sm:flex hidden flex-col gap-2'>
                    {currLevels.map((e,index) => (
                        <div key={index} className={`text-white  ${user.level === e ? 'bg-[#295725]' : 'bg-[#383434] '} ${user.level > e ? ' bg-green-600 ' : ''} px-7 py-2 rounded-lg`}>
                            <span>Level {e}</span>
                        </div>
                    ))}
                </div>}
            </div>}
        </div>
    );
}
