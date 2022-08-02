import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// List 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ListItemButton from '@mui/material/ListItemButton';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Img from './Images/ggg.svg'
import Imgs from './Images/appstore.svg'

import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import url from './url'
import { DeleteOutline } from '@material-ui/icons';


const useStyles = makeStyles({
  btn: {
    width: '100%',
    height:'50px'
  }, marginT: {
    marginTop: '20px'
  }, iconstyle: {
    backgroundColor: '#1379c8',
    color: 'white',
    borderRadius: '50%',
    fontSize: '1.25rem',
    width: ' 40px',
    height: '40px'

  }, listStyle: {
    padding: '10px',
    cursor: 'pointer'
  }, textStyle: {
    fontSize: '12px'
  }, headStyle: {
    color: 'black',
    fontSize: ' 1.25rem',
    fontWeight: '200',
    lineHeight: ' 1.2'
  },
  appbtn: {
    borderRadius: '10px',
    width: '100%'
  }, notification: {
    textDecoration: 'none',
    position: 'relative',
    display: 'inline-block',
    borderRadius: '2px'
  }, badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    borderRadius: ' 50%',
    cursor: 'pointer',
    color: 'red'
  },
  badge1: {
    position: 'absolute',
    marginLeft: '-30px',
    marginTop: '5px',
    cursor: 'pointer',
    color: 'red'
  }

})
const override = {
  display: ' block',
  margin: '0 auto',
  //   borderColor: 'red',
}
const color = "black"


export const data = {
  labels: ['Not Attempted', 'Quiz Attempted', 'Attendence'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
function AllCourses(props) {
  const [loading1, setLoading1] = useState(false);

  const headers = {
    'Content-Type': 'application/json'
  }
  // Get all Enrolled Courses
  const [dataEnrolled, setDataEnrolled] = useState([]);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const getAllDataEnrolled = () => {
    axios.get(`${url}class/get-enrolled-classes`, {
      params: {
        _id: props.data
      }
    })
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataEnrolled(response.data);
        setLoadingEnroll(true)

      })
      .catch(error => console.error(`Error:${error}`));
  }
  // Get all Courses
  const [loading, setLoading] = useState(false);
  const getAllData = () => {
    axios.get(`${url}class/get-owner-classes`, {
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
    getAllDataEnrolled();

  }, []);

  const openClass = (idData) => {
    console.log(idData)
    navigate('/coursestream',
      {
        state: {
          post_id: idData,
        }
      });

  }
  // Delete Class 
  const deleteClass = (idData) => {
    console.log(idData)
    axios.delete(`${url}class/delete`, {
      data: {
        _id: idData
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
              'Course has been deleted.',
              'success'
            )
            //    refresh componenet 
            getAllData();
            // window.location.reload(false);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Course is safe :)',
              'error'
            )
          }
        })
        // setOpen1(true);
      }).catch(err => {
        console.log(err)
      })

  }
  // Delete class Join 
  // Delete Class 
  const deleteClassJoin = async (idData) => {
    console.log(idData)
    console.log(props.data)
    await axios.put(`${url}class/leave`, {
      class_id: idData,
      user_id: props.data
    }, { headers }).then(response => {
      console.log(response)
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
            'Course has been Unenrroled.',
            'success'
          )
          //    refresh componenet 
          getAllData();
          getAllDataEnrolled();
          // window.location.reload(false);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
          )
        }
      })
      // setOpen1(true);
    }).catch(err => {
      console.log(err)
    })

  }
  const openClassJoin = (idData) => {
    console.log(idData)
    navigate('/coursestreamjoin',
      {
        state: {
          post_id: idData,
        }
      });

  }
  const [data, setData] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = props.data
  // calender 
  const [value, onChange] = useState(new Date());
  // chart 
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [createTitle, setcreateTitle] = useState("");
  const [createDescription, setcreateDescription] = useState("");
  const Create = () => {
    setLoading1(true)
    setTimeout(() => {
      setLoading1(false)
    }, 3000)
    axios.post(`${url}class/create`, {
      name: createTitle,
      description: createDescription,
      owner: props.data
    }, { headers }).then(response => {
      console.log(response)
      const classId = response.data._id
      // setuserId(response.data._id)
      let timerInterval
      Swal.fire({
        title: 'Created Class Successfully',
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
        navigate('/coursestream',
          {
            state: {
              post_id: classId,
            }
          });
      })
    })
      .catch(err => {
        console.log(err)
      })

  }
  // Join Class 
  const [joinClassCode, setjoinClassCode] = useState("");
  const Join = () => {
    axios.put(`${url}class/join`, {
      classId: joinClassCode,
      user_id: props.data,
    }, { headers }).then(response => {
      console.log(response)

      let timerInterval
      Swal.fire({
        title: 'Joined Class Successfully',
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
        setjoinClassCode([])
        getAllData();
        getAllDataEnrolled();
      })
    })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          {/* Heading  */}
          <Grid container spacing={2} className={classes.marginT}>
            <Grid item xs={12} md={12}>
              <Typography variant='h5'>Courses</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Button startIcon={
                        <Avatar className={classes.iconstyle}><StickyNote2Icon /></Avatar>
                      }>
                        <div className={classes.headStyle}>My Courses</div>

                      </Button>

                    </Grid>
                    {loading && data.map((row) => (
                      <Grid item xs={12} md={4} className={classes.notification}>
                        <Button variant="outlined" className={classes.btn}
                          onClick={() => {
                            openClass(row._id)
                          }}>
                          {row.name}
                        </Button>
                        <span className={classes.badge}
                          onClick={() => {
                            deleteClass(row._id)
                          }}><DeleteOutline /></span>

                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Button startIcon={
                        <Avatar className={classes.iconstyle}><DoneAllIcon /></Avatar>
                      }>
                        <div className={classes.headStyle}> Enrolled Courses</div>
                      </Button>

                    </Grid>
                    {loading && dataEnrolled.map((row) => (
                      <Grid item xs={12} md={4}>
                        <Button variant="outlined" className={classes.btn}
                          onClick={() => {
                            openClassJoin(row._id)
                          }}>
                          {row.name}

                        </Button>
                        <span className={classes.badge1}
                          onClick={() => {
                            deleteClassJoin(row._id)
                          }}><DeleteOutline /></span>
                      </Grid>
                    ))}


                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* First Cards  */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Button startIcon={
                            <Avatar className={classes.iconstyle}><AddIcon /></Avatar>
                          }>
                            <div className={classes.headStyle}>Create Course</div>

                          </Button>

                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                            value={createTitle} onChange={
                              (e) => setcreateTitle(e.target.value)
                            } />

                        </Grid>
                        <Grid item xs={12} md={12}>

                          <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            value={createDescription}
                            onChange={
                              (e) => setcreateDescription(e.target.value)
                            }
                            placeholder="Enter Description"
                            style={{ width: 200 }}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Button onClick={() => {
                            Create()
                          }}
                            className={classes.btn} variant="contained" endIcon={<AddIcon />}>
                            {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h3>Create</h3>}
                          </Button>
                        </Grid>

                      </Grid>
                    </CardContent>

                  </Card>
                </Grid>
              </Grid>
              {/* Second Card  */}


            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Button startIcon={
                            <Avatar className={classes.iconstyle}><AddIcon /></Avatar>
                          }>
                            <div className={classes.headStyle}>Join Course</div>

                          </Button>

                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField className={classes.btn} id="filled-basic" label="Enter Class Code" variant="filled"
                            value={joinClassCode} onChange={
                              (e) => setjoinClassCode(e.target.value)
                            } />

                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Button className={classes.btn} variant="contained" endIcon={<AddIcon />}
                            onClick={() => {
                              Join()
                            }}>
                            Join
                          </Button>
                        </Grid>

                      </Grid>
                    </CardContent>

                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>

    </div>
  )
}

export default AllCourses