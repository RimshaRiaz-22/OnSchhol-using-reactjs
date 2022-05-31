import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import url from './url'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Card } from 'react-bootstrap'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  GridStyle: {
    border: ' 1px solid #e4e6ef',
    borderRadius: '5px',
    marginTop: '45px',
    padding: '30px',
    marginBottom: '10px'
  },
  GridBoxStyle: {
    border: ' 1px solid #e4e6ef',
    backgroundColor: 'white',
    borderRadius: '5px',
  }, heading: {
    marginBottom: '30px'

  }, InputStyle: {
    border: ' 1px solid #2d2d3f',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: 'black',
    width: '87%',
    height: '15px',
    padding: '20px'
  }, btnSubmit: {
    backgroundColor: '#36f195',
    padding: '10px',
    fontSize: '15px',
    border: 'transparent',
    borderRadius: '5px',
    color: 'white',
    marginLeft: '234px'
}
})

const heading = {
  marginBottom: '30px'
}
const btn = {
  // width: '100%',
  marginBottom: '10px',
  color: '#1976d2',
  backgroundColor: 'transparent',
}
const Notes = (props) => {
  console.log('setting props');
  console.log(props.data)
  const classes = useStyles();

  //Get API Axios Update-km-per hour

  useEffect(() => {
    getAllData2();
  }, []);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState([]);
  const headers = {
    'Content-Type': 'application/json'
  }

  const getAllData2 = () => {
    axios.get(`${url}notes/get-user-notes`, {
      params: {
          _id: props.data
      }
  })
      .then((response) => {
          console.log('get notes user')
          console.log(response);
          setData2(response.data)
         
      })
      .catch(error => console.error(`Error:${error}`));

  }
  // Add 
  const [openAdd, setOpenAdd] = React.useState(false);
  const [details, setdetails] = useState('');

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault()
    axios.post(`${url}notes/create`, {
         owner:props.data,
        details: details,
    }, { headers }).then(response => {
        console.log(response)
        setOpenAdd(false);
        setData([...data, response.data]);
        // Clear Dta 
        let timerInterval
        Swal.fire({
            title: 'Notes Saved Successfully',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    })
        .catch(err => {
            console.log(err)
        })
  }


  return (
    <div>
      <Grid container spacing={2} className={classes.GridStyle}>
        <Grid item xs={10} md={10}>
          <Typography variant='h6' style={heading}>Notes</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button style={btn} onClick={handleClickOpenAdd}><NoteAddIcon /></Button>
          {/* Dialog */}
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogContent>
              {/* Form  */}

              <form >
                <Grid container spacing={2} className={classes.gridS}>
                  <Grid item xs={12} md={12}>
                    {/* <input type="text" name="name" className={classes.inputStyle} placeholder="Enter Topic Name"
                      value={details}
                      onChange={(e) => setdetails(e.target.value)
                      }
                    /> */}
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={10}
                      value={details}
                      onChange={(e) => setdetails(e.target.value)}
                      placeholder="Enter Notes"
                      style={{ width: 500 }}
                    />
                  </Grid>

                  <Grid item xs={6} md={6} >
                    <button className={classes.btnSubmit} onClick={submitHandler} type='submit'>Save</button>
                  </Grid>
                </Grid>
              </form>
              {/* End form  */}
            </DialogContent>
          </Dialog>
          {/* Dialog End  */}
        </Grid>
        {/* Update admin credential  */}
        <Grid item xs={12} md={12}  >
          <Grid container spacing={2}>
            {/* {loading2 && data2.map((row) => ( */}
              <Grid item xs={12} md={4}>
                <Card className='cardPadding' style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>ow.details</Card.Title>
                    <Card.Text>
                      sfsffs
                    </Card.Text>
                    <h5>

                    </h5>
                    <h6 className='Heading1'>

                    </h6>
                  </Card.Body>
                </Card>
              </Grid>
             {/* ))}  */}
          </Grid>


        </Grid>

        {/* <Grid item xs={12} md={6}  >
                    
                </Grid> */}
      </Grid>
    </div>
  )
}

export default Notes