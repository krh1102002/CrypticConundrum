import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Logo from '../Logo.png'
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthPage() {
  const [value, setValue] = React.useState(0);
  const [isError,setIsError] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {error} = useSelector((state) => state.user)
  React.useEffect(()=>{
    if(error.length>0){
        setIsError(true);
        setTimeout(()=>{
            setIsError(false)
        },[8000])
    }

  },[error])
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='pt-2 pb-4 flex gap-2 items-center'> 
            <img src={Logo} alt="" className='md:w-32 w-24 h-auto bg-cover'/>
            <h2 className='text-white md:text-2xl text-lg font-mono font-semibold'>Cryptic Conundrum</h2>
        </div>
        <Box className='flex flex-col lg:w-2/5 md:w-1/2 w-11/12 justify-center items-center rounded-xl bg-[#2f2424] shadow-lg shadow-black'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', color:'white' }} className='flex justify-center w-full text-white'>
                <Tabs indicatorColor='secondary' value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} className='w-full'>
                <SignIn />
            </TabPanel>
            <TabPanel value={value} index={1} className='w-full'>
                <SignUp />
            </TabPanel>
        </Box>
        {isError && error?.length>0 &&
        <div className='absolute top-5 right-5 z-10'>
           <Alert severity="error">{error}</Alert>
        </div>}
    </div>
  );
}
