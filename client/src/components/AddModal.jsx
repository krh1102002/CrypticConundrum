import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addLevel } from '../redux/level/Api';

export default function AddModal({open,setOpen}) {

  const handleClose = () => {
    setOpen(false);
  };

  const [level,setLevel] = React.useState("")
  const [word,setWord] = React.useState("")
  const [alterWord,setAlterWord] = React.useState("")
  const [image,setImage] = React.useState("")
  
  const dispatch = useDispatch()
  const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        level,
        word:word.toUpperCase(),
        alterWord:alterWord.toUpperCase(),
        image
    }
    setLevel(0)
    setWord("")
    setAlterWord("")
    setImage("")

    setOpen(false);
    dispatch(addLevel(data))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Level</DialogTitle>
        <DialogContent>
          <form action="" onSubmit={handleSubmit}>
            <Box className='flex gap-1 flex-col text-black'>
                <label htmlFor="number" className='text-base font-semibold'>Enter Level</label>
                <input 
                    type="Number"
                    name="" 
                    id="number" 
                    value={level}
                    min={1}
                    placeholder='Enter Level'
                    required
                    onChange={(e) => setLevel(e.target.value)}
                    className='w-full border bg-transparent text-black focus:outline-none px-4 py-2 rounded-lg'
                />
            </Box>
            <Box className='flex gap-1 flex-col text-black'>
                <label htmlFor="word" className='text-base font-semibold'>Enter Word</label>
                <input 
                    type="text"
                    name="" 
                    id="word" 
                    value={word}
                    placeholder='Enter Word'
                    required
                    onChange={(e) => setWord(e.target.value)}
                    className='w-full border bg-transparent text-black focus:outline-none px-4 py-2 rounded-lg'
                />
            </Box>
            <Box className='flex gap-1 flex-col text-black'>
                <label htmlFor="alterWord" className='text-base font-semibold'>Enter Word</label>
                <input 
                    type="text"
                    name="" 
                    id="alterWord" 
                    value={alterWord}
                    placeholder='Enter AlterWord'
                    required
                    onChange={(e) => setAlterWord(e.target.value)}
                    className='w-full border bg-transparent text-black focus:outline-none px-4 py-2 rounded-lg'
                />
            </Box>
            <Box className='flex gap-1 flex-col text-black'>
                <label htmlFor="image" className='text-base font-semibold'>Enter Image Url</label>
                <input 
                    type="url"
                    name=""
                    id="image" 
                    value={image}
                    placeholder='Enter Url'
                    required
                    onChange={(e) => setImage(e.target.value)}
                    className='w-full border bg-transparent text-black focus:outline-none px-4 py-2 rounded-lg'
                />
            </Box>
            <Box className='flex gap-2 justify-end items-center py-3'>
              <Button onClick={handleClose}>Cancel</Button>
              <input type="submit" value="Add" className='bg-blue-500 px-3 py-1 text-white rounded cursor-pointer'/>
            </Box>
          </form>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
