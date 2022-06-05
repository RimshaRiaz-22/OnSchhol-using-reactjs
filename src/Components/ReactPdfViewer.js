import React from 'react'
import { useLocation } from 'react-router-dom';
import url from './url'

function ReactPdfViewer() {
    const { state } = useLocation();
    const value  =`${url}${state.link}`;
    
  return (
    <div>
        {console.log(state.link)}
        {console.log(value)}
    <iframe src="https://people.engr.tamu.edu/choe/choe/courses/12summer/315/lectures/kwon-android01.pdf" width="100%" height="600px">
    </iframe>
</div>

  )
}

export default ReactPdfViewer