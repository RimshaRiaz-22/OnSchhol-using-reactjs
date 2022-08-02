import React from 'react'
import Container from '../Components/Container';
import { useLocation } from 'react-router-dom';

function Homepage() {
    const { state } = useLocation();
    
    return (
        <>
       { console.log('Homepage session')}
        {console.log(state.email)}
        <Container data={state.email}/>
        </>
    )
}

export default Homepage