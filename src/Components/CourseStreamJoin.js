import React from 'react'
import Box from '@mui/material/Box';
import AppBarStreamJoin from '../Components/AppBarStreamJoin';
import { useLocation } from 'react-router-dom';


function CourseStreamJoin() {
  const { state } = useLocation();
  return (
    <>
    <Box sx={{ display: 'flex' }} >
      {console.log('corse stream')}
      {console.log(state.post_id)}
    <AppBarStreamJoin data={state.post_id}
       />

    </Box>
    </>
  )
}

export default CourseStreamJoin