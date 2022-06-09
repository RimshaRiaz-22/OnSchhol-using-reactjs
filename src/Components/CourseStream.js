import React from 'react'
import Box from '@mui/material/Box';
import AppBarStream from '../Components/AppBarStream';
import { useLocation } from 'react-router-dom';


function CourseStream() {
  const { state } = useLocation();
  return (
    <>
    <Box sx={{ display: 'flex' }} >
      {console.log('course stream')}
      {console.log(state.post_id)}
    <AppBarStream data={state.post_id}
       />

    </Box>
    </>
  )
}

export default CourseStream