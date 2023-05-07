import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ReactLoading from 'react-loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import {MdDelete,MdEdit,MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import {AiOutlinePlus} from 'react-icons/ai'
import { deleteLevel, getAllLevels } from '../redux/level/Api';
import AddModal from '../components/AddModal';
import { Alert } from '@mui/material';
import { logout } from '../redux/user/Api';
import EditModal from '../components/EditModal';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a2225',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {/* {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />} */}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {/* {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />} */}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ManagePage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(40);
    const[addModalOpen,setAddModalOpen] = React.useState(false)
    const[editModalOpen,setEditModalOpen] = React.useState(false)
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch()
  const handleDelete = (level) =>{
    let toDelete = window.confirm("Do you want to delete level")
    if(toDelete)
        dispatch(deleteLevel(level._id))
  }

  const [currId,setCurrId] = useState("")
  const [currLevel,setCurrLevel] = useState("")
  const [currWord,setCurrWord] = useState("")
  // const [currAlterWord,setCurrAlterWord] = useState("")
  const [currImage,setCurrImage] = useState("")
  const [isError,setIsError] = React.useState(false);

  const handleEdit = (level) =>{
    setCurrId(level._id)
    setCurrLevel(level.level)
    setCurrWord(level.word)
    // setCurrAlterWord(level.alterWord)
    setCurrImage(level.image)
    setEditModalOpen(true)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const {levels,error,loading} = useSelector((state) => state.level);
  const {user} = useSelector((state) => state.user)
  useEffect(()=>{
    dispatch(getAllLevels())
  },[])
  const navigate = useNavigate()
  useEffect(() =>{
    if(user && !user.isAdmin)
      navigate("/")
  },[user])
  useEffect(()=>{
    if(error.length>0){
        setIsError(true);
        setTimeout(()=>{
            setIsError(false)
        },[5000])
    }

  },[error])
  
    const handleLogout = (e) =>{
        e.preventDefault()
        dispatch(logout())
    }
    if (loading) {
      return (
          <div className='flex justify-center items-center h-full w-full'>
              <ReactLoading type={'spin'} color={'white'} height={'30px'} width={'30px'} />
          </div>
      )
  }
  return (
    <div className='md:px-6 px-2'>
      {isError && error?.length>0 &&
        <div className='absolute top-5 right-5 z-10'>
           <Alert severity="error">{error}</Alert>
        </div>}
    {levels && <div className=''>
        <AddModal open={addModalOpen} setOpen={setAddModalOpen} />
        <EditModal open={editModalOpen} setOpen={setEditModalOpen} _id={currId} level={currLevel} word={currWord} image={currImage}/>
      <div className='flex justify-between items-center py-4'>
            <h1 className='py-2 md:px-6 px-2 md:text-2xl text-lg font-semibold text-white '>Manage Levels</h1>
            <div className='flex gap-2'>
                <button className='flex justify-center items-center rounded-lg px-2 py-1 text-white bg-blue-500' onClick={()=>setAddModalOpen(true)}>
                    <AiOutlinePlus />
                    <span>Add Level</span>
                </button>
                <button onClick={handleLogout} className='px-2 py-1 border rounded-xl hover:bg-white transition-colors duration-200 hover:text-[#2b2121] border-white text-white font-semibold'>Logout</button>
            </div>
      </div>
    {!levels || levels.length == 0 ? <h3 className='text-gray-400 text-center font-semibold text-lg'>No Levels Added</h3>:<TableContainer component={Paper} className=''>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                <StyledTableCell align='center'>Level</StyledTableCell>
                <StyledTableCell align='center'>Word</StyledTableCell>
                {/* <StyledTableCell align='center'>Alter Word</StyledTableCell> */}
                <StyledTableCell align='left'>Image</StyledTableCell>
                <StyledTableCell align='center'>Actions</StyledTableCell>
                </TableRow>
            </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? levels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : levels
          ).map((level,index) => (
            <>
                <StyledTableRow key={index}>
                    <StyledTableCell align='center' component="th" scope="row">
                    Level {level.level}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{level.word}</StyledTableCell>
                    {/* <StyledTableCell align='center'>{level.alterWord}</StyledTableCell> */}
                    <StyledTableCell align='center'>
                        <img src={level.image} alt="" className='w-20 h-20'/>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                    <div className='flex gap-2 items-center justify-center'>
                        <button className='border px-1 pr-2 py-1 flex items-center rounded-md  text-white bg-green-600' style={{gap:'1px'}} onClick={() => handleEdit(level)}>
                            <MdEdit className='text-white' style={{color:'white', fontSize:'14px'}}/>
                            <span className='' >Edit</span>
                        </button>
                        <button className='border px-2 py-1 flex items-center rounded-md  bg-red-600 text-white' style={{gap:'1px'}} onClick={() => handleDelete(level)}>
                            <MdDelete className='text-white' style={{color:'white', fontSize:'14px'}}/>
                            <span>Delete</span>
                        </button>
                    </div>
                    </StyledTableCell>
                </StyledTableRow>
              </>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[50, 80, { label: 'All', value: -1 }]}
              colSpan={3}
              count={levels.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>}
    </div>}
    </div>
  );
}