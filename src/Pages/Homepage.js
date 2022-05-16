import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
import AppBar1 from '../Components/AppBar1';
// import jwt from 'jsonwebtoken'
// import { useNavigate } from 'react-router-dom'

function Homepage() {
  // let navigate = useNavigate();

  // useEffect(()=>{
  // const token = localStorage.getItem('token')
  // if(token){
  //   const user = jwt.decode(token)
  //   if(!user){
  //     localStorage.removeItem('token')
  //     navigate('/')

  //   }
  // }
  // },[])
  return (
    <>
    <Box sx={{ display: 'flex' }} >
    <AppBar1 />

    </Box>
    </>
  )
}

export default Homepage