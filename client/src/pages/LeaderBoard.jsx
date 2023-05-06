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
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import { getAllUser } from '../redux/user/Api';
import Navbar from '../components/Navbar';

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
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch()
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  const {allUsers,loading} = useSelector((state) => state.user);
  const [leaderboardUsers,setLeaderBoardUsers] = useState("")
  useEffect(()=>{
    let users;
    if(allUsers.length > 0)
      users = allUsers.filter((user) => user.attempt > 0)
    if(users?.length > 0){
      users.sort((a,b) =>{
        if(a.level > b.level)
            return -1;
        else if(a == b && a.attempt < b.attempt)
            return -1;
        else
            return 1
      })
      setLeaderBoardUsers(users)
    }
  },[allUsers])
    if (loading) {
      return (
          <div className='flex justify-center items-center h-full w-full'>
              <ReactLoading type={'spin'} color={'white'} height={'30px'} width={'30px'} />
          </div>
      )
  }

  return (
    <div className='md:px-6 px-2 text-white'>
      <Navbar />
    {leaderboardUsers ? <div className=''>
      <h1 className='text-2xl font-semibold py-4'>LeaderBoard Ranking</h1>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Rank</StyledTableCell>
                  <StyledTableCell align='center'>Name</StyledTableCell>
                  <StyledTableCell align='center'>PRN</StyledTableCell>

                  <StyledTableCell align='center'>Level</StyledTableCell>
                  <StyledTableCell align='center'>Attempts</StyledTableCell>
                </TableRow>
            </TableHead>
        <TableBody className=''>
          {(rowsPerPage > 0
            ? leaderboardUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : leaderboardUsers
          ).map((user,index) => (
            <>
                <StyledTableRow key={index}>
                    <StyledTableCell align='center' component="th" scope="row">{index + 1}</StyledTableCell>
                    <StyledTableCell align='center'>{user.name}</StyledTableCell>
                    <StyledTableCell align='center'>{user.prn}</StyledTableCell>
                    <StyledTableCell align='center'>{user.level}</StyledTableCell>
                    <StyledTableCell align='center'>{user.attempt}</StyledTableCell>
                </StyledTableRow>
              </>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter className=''>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[8, 16, { label: 'All', value: -1 }]}
              colSpan={3}
              count={leaderboardUsers.length}
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
    </TableContainer>
    </div>:<div className='py-4'>
              <h3 className='text-center font-semibold text-lg text-gray-300'>No User Played</h3>
      </div>}
    </div>
  );
}