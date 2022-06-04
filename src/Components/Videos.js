import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import url from './url'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Swal from 'sweetalert2'
import DialogContentText from '@mui/material/DialogContentText';

const useStyles = makeStyles({
  GridStyle: {
    // border: ' 1px solid #e4e6ef',
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

const Videos = (props) => {
  console.log('setting props');
  console.log(props.data)
  const classes = useStyles();

  //Get API Axios Update-km-per hour


  const [loading, setLoading] = useState(false);
  const [dataVideos, setDataVideos] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState([]);
  const headers = {
    'Content-Type': 'application/json'
  }

  // const getAllData = async() => {
  //   const idData = props.data;
  //   console.log(idData)
  //   await axios.get(`${url}Videos/get-user-Videos`, {
  //     params: {
  //       _id: props.data
  //     }
  //   })
  //     .then((response) => {
  //       console.log('get Videos user')
  //       console.log(response);
  //       const allData = response.data
  //       setDataVideos(allData);
  //       console.log(dataVideos)

  //     })
  //     .catch(error => console.error(`Error:${error}`));

  // }
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
    axios.post(`${url}Videos/create`, {
      owner: props.data,
      details: details,
    }, { headers }).then(response => {
      console.log(response)
      setOpenAdd(false);
      // setDataVideos([...data, response.data]);
      // Clear Dta 
      let timerInterval
      Swal.fire({
        title: 'Videos Saved Successfully',
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
            //    refresh componenet 
            axios.get(`${url}Videos/get-user-Videos`, {
              params: {
                  _id: props.data
              }
          })
                .then((response) => {
                    const allData = response.data;
                    console.log(allData);
                    setData(response.data);
                    setLoading(true)
                     
                })
                .catch(error => console.error(`Error:${error}`));
                setdetails("")

        }
      })
    })
      .catch(err => {
        console.log(err)
      })
  }
  // Edit 
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleCloseUpdate = () => {
      setOpenUpdate(false);
  };
  const [descriptionUpdate, setDescriptionUpdate] = useState([]);
  const [IdVideosUpdate, setIdVideosUpdate] = useState([]);

  const [dateUpdate, setDateUpdate] = useState(new Date());

  const onToggleEditMode = async (id) => {
      setOpenUpdate(true);
      console.log(id);
      await axios.get(`${url}Videos/get`, {
          params: {
              _id: id
          }
      }, { headers }).then(response => {
          console.log('response')
          console.log(response.data);
         setDescriptionUpdate(response.data.details)
         setIdVideosUpdate(response.data._id)
      })
          .catch(err => {
              console.log(err)
          })
  }
     // submitUpdate
     const submitUpdate = (e) => {
      e.preventDefault()
    
         
      // POst Request 
      axios.put(`${url}Videos/update`, {
          _id: IdVideosUpdate,
          details: descriptionUpdate,
      }, { headers }).then(response => {
          console.log(response)
          setOpenUpdate(false);
          // Clear Dta 
    

          let timerInterval
          Swal.fire({
              title: 'Updated Videos Successfully',
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
           //    refresh componenet 
           axios.get(`${url}Videos/get-user-Videos`, {
            params: {
                _id: props.data
            }
        })
              .then((response) => {
                  const allData = response.data;
                  console.log(allData);
                  setData(response.data);
                  setLoading(true)
                   
              })
              .catch(error => console.error(`Error:${error}`));
      })
          .catch(err => {
              console.log(err)
          })
  }
     // Delete 
    // Alert 
    const deleteData = (id,owner) => {
      console.log('deleting phone no')
      console.log(id);
      axios.delete(`${url}Videos/delete`, {
          data: {
              _id: id
          }
      }, { headers })
          .then(res => {
              console.log(res);
              console.log(res.data);
              const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                  },
                  buttonsStyling: {
                      backgroundColor: '#4CAF50', /* Green */
                      border: 'none',
                      color: 'white',
                      padding: '15px 32px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px'
                  }
              })

              swalWithBootstrapButtons.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  reverseButtons: true
              }).then((result) => {
                  if (result.isConfirmed) {
                      swalWithBootstrapButtons.fire(
                          'Deleted!',
                          'Videos has been deleted.',
                          'success'
                      )
                      //    refresh componenet 
                      axios.get(`${url}Videos/get-user-Videos`, {
                        params: {
                            _id: owner
                        }
                    })
                          .then((response) => {
                              const allData = response.data;
                              console.log(allData);
                              setData(response.data);
                              setLoading(true)
                               
                          })
                          .catch(error => console.error(`Error:${error}`));

                      // window.location.reload(false);
                  } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                  ) {
                      swalWithBootstrapButtons.fire(
                          'Cancelled',
                          'Topic is safe :)',
                          'error'
                      )
                  }
              })
              // setOpen1(true);
          }).catch(err => {
              console.log(err)
          })
  }
  const [data, setData] = useState([]);

  const getAllData = () => {
    axios.get(`${url}Videos/get-user-Videos`, {
      params: {
          _id: props.data
      }
  })
        .then((response) => {
            const allData = response.data;
            console.log(allData);
            setData(response.data);
            setLoading(true)
             
        })
        .catch(error => console.error(`Error:${error}`));
}
useEffect(() => {
    getAllData();

}, []);
  // useEffect(() => {
  //   getAllData();
  // }, []);

  return (
    <>
     <Grid container spacing={2}>
        <Grid item  xs={12}  md={2}></Grid>
        <Grid item xs={12} md={8}>
     
      <Grid container spacing={2} className={classes.GridStyle}>
        <Grid item xs={10} md={10}>
          <Typography variant='h6' style={heading}>Videos</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button style={btn} onClick={handleClickOpenAdd}><NoteAddIcon /></Button>
          {/* Dialog */}
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Add Videos</DialogTitle>
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
                      placeholder="Enter Videos"
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
        {/* data view  */}
       


        {/* <Grid item xs={12} md={12}>
          <Grid container spacing={2}> */}
          {loading && data.map((row) => (
                        <Grid item xs={12} md={4}>
                       
                            <Card variant="outlined">
              <>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {row.date}
                  </Typography>
                  <Typography variant="h5" component="div">
                  </Typography>
                 
                  <Typography variant="body2">
                   {row.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small"
                  onClick={() => {
                    console.log(row._id)
                    deleteData(row._id,row.owner)
                }}><DeleteIcon/></Button>
                  <Button size="small"
                   onClick={() => onToggleEditMode(row._id)}
                  
                  ><ModeEditOutlineIcon/></Button>

                </CardActions>
              </>
            </Card>

                        </Grid>
                        ))}
                    {/* </Grid>
        </Grid> */}
       
       
      </Grid>
      {/* Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                                <DialogTitle>Update Videos</DialogTitle>
                                <DialogContent>
                                    {/* Form  */}
                                    <form onSubmit={submitUpdate}>
                                        <Grid container spacing={2} className={classes.gridS}>
                                            <Grid item xs={12} md={6}>
                                              
                                                  <TextareaAutosize
                      aria-label="minimum height"
                      minRows={10}
                      value={descriptionUpdate}
                      onChange={(e) => setDescriptionUpdate(e.target.value)}
                      placeholder="Enter Videos"
                      style={{ width: 500 }}
                    />
                                            </Grid>
                                       <br />
                                            <Grid item xs={6} md={6} >
                                                <button className={classes.btnSubmit} type='submit'>Submit</button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                    {/* End form  */}
                                </DialogContent>
                            </Dialog>
                            {/* Dialog End  */}
                            </Grid>
    <Grid item  xs={12}  md={2}></Grid>
    </Grid>
    </>
   
  )
}

export default Videos