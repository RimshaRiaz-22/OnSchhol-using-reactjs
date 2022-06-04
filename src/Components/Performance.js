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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@mui/material/TableContainer';
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
const TextColor = {
  color: '#9a9cab',
}
const heading = {
  marginBottom: '30px'
}
const btn = {
  // width: '100%',
  marginBottom: '10px',
  color: '#1976d2',
  backgroundColor: 'transparent',
}
const Performance = (props) => {
  console.log('setting props');
  console.log(props.data)
  const classes = useStyles();

  //Get API Axios Update-km-per hour

  useEffect(() => {
    getAllData1();
  }, []);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState([]);
  const headers = {
    'Content-Type': 'application/json'
  }

  const getAllData1 = () => {
    const idData=props.data;
    console.log(idData)
    axios.get(`${url}Performance/get-user-Performance`, {
      params: {
          _id: props.data
      }
  })
      .then((response) => {
          console.log('get Performance user')
          console.log(response);
          const allData=response.data
          setData(allData);
          console.log(data)
         
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
    axios.post(`${url}Performance/create`, {
         owner:props.data,
        details: details,
    }, { headers }).then(response => {
        console.log(response)
        setOpenAdd(false);
        setData([...data, response.data]);
        // Clear Dta 
        let timerInterval
        Swal.fire({
            title: 'Performance Saved Successfully',
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
          <Typography variant='h6' style={heading}>Performance</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button style={btn} onClick={handleClickOpenAdd}><NoteAddIcon /></Button>
          {/* Dialog */}
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Add Performance</DialogTitle>
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
                      placeholder="Enter Performance"
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
        <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={TextColor}>Subscription No</TableCell>
                                            <TableCell style={TextColor}>Topic</TableCell>
                                            <TableCell style={TextColor}>Playlist</TableCell>
                                            {/* <TableCell style={TextColor}>Total Price</TableCell> */}
                                            <TableCell style={TextColor}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {loading && data.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell style={TextColor} >{row.date}</TableCell>
                                                <TableCell style={TextColor} >{row.details}</TableCell>

                                                <TableCell style={TextColor} >
                                                    {/* {row.playlist} */}

                                                </TableCell>
                                                {/* <TableCell style={TextColor} >{row.totalPrice}</TableCell> */}

                                                <TableCell >
                                                    {/* <button className={classes.btn1}
                                                        onClick={() => {
                                                            console.log(row._id)
                                                            deleteData(row._id)
                                                        }}
                                                    > <BackspaceIcon /></button> */}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


        </Grid>

        {/* <Grid item xs={12} md={6}  >
                    
                </Grid> */}
      </Grid>
    </div>
  )
}

export default Performance