import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLevel } from '../redux/level/Api';

export default function EditModal({open,setOpen,_id,level,word,alterWord,image}) {

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{
    setIdUp(_id)
    setLevel(level)
    setWord(word)
    setAlterWord(alterWord)
    setImage(image)
  },[_id,level,word,image,alterWord])

  const [idUp,setIdUp] = React.useState("")
  const [levelUp,setLevel] = React.useState("")
  const [wordUp,setWord] = React.useState("")
  const [alterWordUp,setAlterWord] = React.useState("")
  const [imageUp,setImage] = React.useState("")
  
  const dispatch = useDispatch()
  const handleUpdate = (e) =>{
    e.preventDefault()
    const data = {
        _id:idUp,
        level:levelUp,
        word:wordUp.toUpperCase(),
        alterWord:alterWordUp.toUpperCase(),
        image:imageUp
    }
    dispatch(updateLevel(data))
    setOpen(false);
    setLevel(0)
    setWord("")
    setAlterWord("")
    setImage("")
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Level</DialogTitle>
        <DialogContent>
          <form action="" onSubmit={handleUpdate}>
            <Box className='flex gap-1 flex-col text-black'>
                <label htmlFor="number" className='text-base font-semibold'>Enter Level</label>
                <input 
                    type="Number"
                    name="" 
                    id="number" 
                    value={levelUp}
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
                    value={wordUp}
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
                    value={alterWordUp}
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
                    value={imageUp}
                    placeholder='Enter Url'
                    required
                    onChange={(e) => setImage(e.target.value)}
                    className='w-full border bg-transparent text-black focus:outline-none px-4 py-2 rounded-lg'
                />
            </Box>
            <Box className='flex gap-2 justify-end items-center py-3'>
              <Button onClick={handleClose}>Cancel</Button>
              <input type="submit" value="Update" className='bg-blue-500 px-3 py-1 text-white rounded cursor-pointer'/>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
