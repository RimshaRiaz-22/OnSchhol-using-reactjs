import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import welcome from './Images/welcome.jpg'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import url from './url'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import { Event } from '@material-ui/icons';
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


const useStyles = makeStyles({
    cardCenter: {
        margin: '20px'
    }, cardCenter1: {
        margin: '20px',
    }, imgCourse: {
        width: '100%',
        height: '100%',
        borderRadius: '50%'
    }, margincard: {
        marginBottom: '10px'

    }, due: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '14px'
    }, btn: {
        width: '100%',
        marginBottom: '10px',
        marginTop: '10px'
    }, btnB: {
        width: '100%'
    }, marginstyle: {
        marginTop: '20px'
    }

})

const welcomeStyle = {
    width: '100%',

}
const hrStyle = {
    width: '100%'
}
const textStyle = {
    fontSize: '12px',
    fontWeight: '500'
}
const GridBackground = {
    backgroundColor: '#f5f5f5'
}
const Input = styled('input')({
    display: 'none',
});
function MyCourse(props) {
    // const { state } = useLocation();
    console.log('props.data')

    console.log(props.data)
    // Get all Courses
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const [classId, setClassId] = useState([]);
    const [description, setDescription] = useState([]);
    const [ownerId, setOwnerId] = useState([]);
    const [enrolledStud, setEnrolledStud] = useState([]);
    const [enrolledStudData, setEnrolledStudData] = useState([]);

    const ClassIdData = props.data;
    const getAllData = () => {
        axios.get(`${url}class/get`, {
            params: {
                _id: props.data
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setData(allData);
                setTitle(allData.name);
                setClassId(allData.classId);
                setDescription(allData.description);
                setclassDescriptionUpdate(allData.description)
                setclassTitleUpdate(allData.name)
                setEnrolledStud(allData.enrolledStudents.length);
                setEnrolledStudData(response.data.enrolledStudents)
                console.log('enrolled students ');
                console.log(enrolledStudData)
                axios.get(`${url}user/get`, {
                    params: {
                        _id: allData.owner
                    }
                })
                    .then((response) => {
                        const allData1 = response.data;
                        console.log(allData1);
                        setOwnerId(allData1.name);
                    })
                    .catch(error => console.error(`Error:${error}`));
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
        getAllAssignment();
        getAllStream();
        getAllQuiz();

    }, []);

    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(new Date());


    const [show, setShow] = React.useState(true);
    const [showUpload, setShowUpload] = React.useState(false);
    const [showUploadAssign, setshowUploadAssign] = React.useState(false);
    const [showUploadQuiz, setshowUploadQuiz] = React.useState(false);
    const [showUploadLink, setshowUploadLink] = React.useState(false);
    const [showUploadUpdate, setshowUploadUpdate] = React.useState(false);





    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const viewLec = () => {
        setShow(false);

    }
    const backtocourse = () => {
        setShow(true);

    }
    const headers = {
        'Content-Type': 'application/json'
    }
     // People 
      // Class Students
    
    // Settings 
      // Class Update 
      const [classTitleUpdate, setclassTitleUpdate] = useState("");
      const [classDescriptionUpdate, setclassDescriptionUpdate] = useState("");
      const classUpdate = () => {
  
          axios.put(`${url}class/update`, {
              _id: ClassIdData,
              name: classTitleUpdate,
              description: setclassTitleUpdate,
          }, { headers }).then(response => {
              console.log(response)
              // setData([...data, response.data]);
  
              let timerInterval
              Swal.fire({
                  title: 'Class Updated Successfully',
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
                    //   Refresh 
                    axios.get(`${url}class/get`, {
                        params: {
                            _id: props.data
                        }
                    })
                        .then((response) => {
                            const allData = response.data;
                            console.log(allData);
                            setData(allData);
                            setTitle(allData.name);
                            setClassId(allData.classId);
                            setDescription(allData.description);
                            setclassDescriptionUpdate(allData.description)
                            setclassTitleUpdate(allData.name)
            
                            setEnrolledStud(allData.enrolledStudents.length);
                            axios.get(`${url}user/get`, {
                                params: {
                                    _id: allData.owner
                                }
                            })
                                .then((response) => {
                                    const allData1 = response.data;
                                    console.log(allData1);
                                    setOwnerId(allData1.name);
                                })
                                .catch(error => console.error(`Error:${error}`));
            
            
            
            
                            setLoading(true)
            
                        })
                        .catch(error => console.error(`Error:${error}`));
                  }
              })
          })
              .catch(err => {
                  console.log(err)
              })
  
  
      }
    // Upload 
    const [createTitle, setcreateTitle] = useState("");
    const [createDescription, setcreateDescription] = useState("");
    // Assignment upload 
    const [AssignTitle, setAssignTitle] = useState("");
    const [file, setfile] = useState([]);
    const [dueDate, setDueDate] = useState(new Date());
    const [number, setNumber] = useState("");
    // Add 
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        console.log('changehandle')
        console.log(event);
        setSelectedFile(event);
        console.log(selectedFile)

        const formData = new FormData();

        formData.append('file', selectedFile);
        axios.post(`${url}upload-file`,
            formData).then(response => {
                console.log(response.data)
            })
        // fetch(
        //     `${url}upload-file`,
        //     {
        //         method: 'POST',
        //         body: formData,
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    }
    const assignUpload = () => {
        // const formData = new FormData();
        // formData.append('file', file);
        // axios.post(`${url}upload-file`,
        //     formData).then(response => {
        //         console.log(response.data)
        // setfile(response.data);
        axios.post(`${url}assignment-question/create`, {
            class: ClassIdData,
            filePath: 'response.data',
            name: AssignTitle,
            dueDate: dueDate,
            numbers: number,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Assignment Uploaded Successfully',
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
    // Quiz 
    // Assignment upload 
    const [QuizTitle, setQuizTitle] = useState("");
    const [dueDateQuiz, setDueDateQuiz] = useState(new Date());
    const [numberQuiz, setNumberQuiz] = useState("");

    const changeHandlerQuiz = (event) => {


    }
    const QuizUpload = () => {
        // const formData = new FormData();
        // formData.append('file', file);
        // axios.post(`${url}upload-file`,
        //     formData).then(response => {
        //         console.log(response.data)
        // setfile(response.data);
        axios.post(`${url}quiz-question/create`, {
            class: ClassIdData,
            filePath: 'response.data',
            name: QuizTitle,
            dueDate: dueDateQuiz,
            numbers: numberQuiz,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Quiz Uploaded Successfully',
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
    // Stream 
    const [streamTitle, setstreamTitle] = useState("");
    const [streamDetails, setstreamDetails] = useState("");
    const [dateStream, setdateStream] = useState(new Date());
    const streamUpload = () => {

        axios.post(`${url}stream/create`, {
            class: ClassIdData,
            title: streamTitle,
            name: AssignTitle,
            details: streamDetails,
            date: dateStream,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Stream Created Successfully',
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
    // Assignments-Get
    const [AssignData, setAssignData] = useState([]);
    const getAllAssignment = () => {
        axios.get(`${url}assignment-question/get-class-assignments`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setAssignData(response.data);
                console.log('assignment data');
                console.log(AssignData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // Quiz-Get
    const [QuizData, setQuizData] = useState([]);
    const getAllQuiz = () => {
        axios.get(`${url}quiz-question/get-class-quizzes`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setQuizData(response.data);
                console.log('assignment data');
                console.log(QuizData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // Stream-Get
    const [StreamData, setStreamData] = useState([]);
    const getAllStream = () => {
        axios.get(`${url}stream/get-class-streams`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setStreamData(response.data);
                console.log('assignment data');
                console.log(StreamData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }

    return (
        <div>
            <Grid container spacing={2} style={GridBackground}>

                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            padding: '10px',
                            backgroundColor: '#232323',
                            color: '#fff',

                        }}
                    //   #f5f5f5
                    >
                        <Grid container spacing={2} >

                            <Grid item xs={12} md={12}>
                                <img src={welcome} style={welcomeStyle} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h5'>
                                    Course Title:{title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>
                                    Total Enrolled Students:{enrolledStud}
                                </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>
                                    Course Code:{classId}
                                </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <BookmarkBorderIcon />
                                <ArchiveIcon />
                            </Grid>
                            <hr style={hrStyle}></hr>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h6'>Description</Typography>

                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>{description} </span>

                            </Grid>
                            <hr style={hrStyle}></hr>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>Tutor </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>

                                    <Grid item xs={10} md={10}>
                                        <Typography variant='h6'>{ownerId}</Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        < SettingsIcon />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>




                {show ?
                    <>
                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }} className={classes.cardCenter}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} md={8}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        {title}</Typography>



                                                </Grid>
                                                <Grid item xs={4} md={4}>
                                                    <img src={welcome} className={classes.imgCourse} />


                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TabContext value={value}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                                <Tab label="Stream" value="1" />
                                                                <Tab label="Assignments" value="5" />
                                                                <Tab label="Quizes" value="6" />
                                                                {/* <Tab label="Classwork" value="2" /> */}
                                                                <Tab label="People" value="3" />
                                                                {/* <Tab label="Settings" value="4" /> */}
                                                            </TabList>
                                                        </Box>
                                                        {/* Stream */}
                                                        <TabPanel value="1" style={GridBackground}>
                                                            {/* Assignment  api*/}
                                                            {loading && StreamData.map((row) => (
                                                                <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                    <CardContent>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Grid container spacing={2}>
                                                                                    {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                    <Grid item xs={12} md={12}>
                                                                                        <Typography variant='h6'>Latest Stream</Typography>
                                                                                    </Grid>

                                                                                    <Grid item xs={10} md={10}>
                                                                                        {row.title}
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Grid item xs={5} md={5}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    viewLec()
                                                                                }}
                                                                            >View</Button>
                                                                        </Grid>
                                                                        <Grid item xs={7} md={7}>
                                                                            Posted Date:{row.date}
                                                                        </Grid>


                                                                    </CardActions>
                                                                </Card>
                                                            ))}

                                                        </TabPanel>
                                                        {/* Assignment  */}
                                                        <TabPanel value="5" style={GridBackground}>
                                                            {/* Assignment  api*/}

                                                            {/* Assignment  api*/}
                                                            {loading && AssignData.map((row) => (
                                                                <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                    <CardContent>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Grid container spacing={2}>
                                                                                    {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                    <Grid item xs={10} md={10}>
                                                                                        <Typography variant='h6'>Assignments</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={2} md={2}>
                                                                                        <Typography variant='h6' className={classes.due}>Marks:{row.numbers}</Typography>
                                                                                    </Grid>

                                                                                    <Grid item xs={10} md={10}>
                                                                                        {row.name}
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Grid item xs={5} md={5}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    viewLec()
                                                                                }}
                                                                            >View</Button>
                                                                        </Grid>
                                                                        <Grid item xs={7} md={7}>
                                                                            Due Date:{row.dueDate}
                                                                        </Grid>


                                                                    </CardActions>
                                                                </Card>
                                                            ))}


                                                        </TabPanel>
                                                        {/* Quiz  */}
                                                        <TabPanel value="6" style={GridBackground}>
                                                            {/* Quiz  api*/}

                                                            {loading && QuizData.map((row) => (
                                                                <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                    <CardContent>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Grid container spacing={2}>
                                                                                    {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                    <Grid item xs={10} md={10}>
                                                                                        <Typography variant='h6'>Quiz</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={2} md={2}>
                                                                                        <Typography variant='h6' className={classes.due}>Marks:{row.numbers}</Typography>
                                                                                    </Grid>

                                                                                    <Grid item xs={10} md={10}>
                                                                                        {row.name}
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Grid item xs={5} md={5}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    viewLec()
                                                                                }}
                                                                            >View</Button>
                                                                        </Grid>
                                                                        <Grid item xs={7} md={7}>
                                                                            Due Date:{row.dueDate}
                                                                        </Grid>


                                                                    </CardActions>
                                                                </Card>
                                                            ))}

                                                        </TabPanel>
                                                        {/* Classwork  */}

                                                        {/* <TabPanel value="2" style={GridBackground}>
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Typography variant='h5'>
                                                                                        Upload Classwork
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(true);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                            }}>Stream</Button>
                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(true);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                            }}>Assignment</Button>
                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(true);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                            }}>Quiz</Button>

                                                                                        </Grid>

                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>

                                                        </TabPanel> */}
                                                        <TabPanel value="3">
                                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                {/* {loading && data2.map((row) => ( */}
                                                    <>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <StickyNote2Icon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary='hrllo' secondary='{row.description}' />
                                                    </ListItem>

                                                    <Divider variant="inset" component="li" />
                                                    </>
                                                {/* ))} */}
                                                </List>

                                                        </TabPanel>
                                                        <TabPanel value="4">
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Typography variant='h5'>
                                                                                        Update Class
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Grid container spacing={2}>
                                                                                    <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={classTitleUpdate} onChange={
                                                    (e) => setclassTitleUpdate(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Description"
                                                value={classDescriptionUpdate}
                                                onChange={
                                                    (e) => setclassDescriptionUpdate(e.target.value)
                                                }

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                onClick={classUpdate} >
                                                Submit
                                            </Button>
                                        </Grid>
                                                                                    </Grid>





                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>

                                                            </Card>
                                                        </TabPanel>
                                                    </TabContext>

                                                </Grid>
                                            </Grid>






                                        </CardContent>

                                    </Card></Grid>
                            </Grid>


                        </Grid>

                    </>
                    :

                    <>
                        {/* // View  */}
                        <Grid item xs={12} md={7} >
                            <Grid container spacing={2}>


                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }} className={classes.cardCenter}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Button onClick={() => {
                                                        backtocourse()
                                                    }}>Back</Button>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        Title</Typography>



                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        Description</Typography>



                                                </Grid>


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={2} ></Grid>
                    </>
                }
                <Grid item xs={12} md={3} >
                    {showUpload ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Material</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={streamTitle} onChange={
                                                    (e) => setstreamTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Details"
                                                value={streamDetails}
                                                onChange={
                                                    (e) => setstreamDetails(e.target.value)
                                                }

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                onClick={streamUpload} >
                                                Submit
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}


                    {showUploadAssign ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Assignment</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={AssignTitle} onChange={
                                                    (e) => setAssignTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Upload File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <input type="file" name="image" className={classes.inputStyle} placeholder="image"
                                                onChange={
                                                    (e) => changeHandler(e.target.files[0])
                                                    // setfile(e.target.files[0])
                                                    // changeHandler
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={dueDate}
                                                    onChange={(newValue) => {
                                                        setDueDate(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            {/* <input type="text" name="location" className={classes.inputStyle} placeholder="Enter Total Marks"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)
                              }
                            /> */}
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Marks" variant="filled"
                                                value={number} onChange={
                                                    (e) => setNumber(e.target.value)
                                                } />
                                        </Grid>
                                        {/* <Grid item xs={12} md={12}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Basic example"
                                                    value={value1}
                                                    onChange={(newValue) => {
                                                        setValue1(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    value={value2}
                                                    onChange={setValue2}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="file/*" id="icon-button-file" type="file" />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <AttachFileIcon /><Typography>Attach File</Typography>
                                                </IconButton>

                                            </label>
                                        </Grid> */}
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={assignUpload} component="span" >
                                                Upload
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}

                    {showUploadQuiz ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Quiz</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={QuizTitle} onChange={
                                                    (e) => setQuizTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Upload File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <input type="file" name="image" className={classes.inputStyle} placeholder="image"
                                                onChange={
                                                    (e) => changeHandlerQuiz(e.target.files[0])
                                                    // setfile(e.target.files[0])
                                                    // changeHandler
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={dueDateQuiz}
                                                    onChange={(newValue) => {
                                                        setDueDateQuiz(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            {/* <input type="text" name="location" className={classes.inputStyle} placeholder="Enter Total Marks"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)
                              }
                            /> */}
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Marks" variant="filled"
                                                value={numberQuiz} onChange={
                                                    (e) => setNumberQuiz(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={QuizUpload} component="span" >
                                                Upload
                                            </Button>
                                        </Grid>



                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                    {showUploadUpdate ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > News and Event</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={createTitle} onChange={
                                                    (e) => setcreateTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Description"
                                                value={createDescription}
                                                onChange={
                                                    (e) => setcreateDescription(e.target.value)
                                                }

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="file/*" id="icon-button-file" type="file" />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <AttachFileIcon /><Typography>Attach File</Typography>
                                                </IconButton>

                                            </label>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span" >
                                                Submit
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                    {showUploadLink ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Class Link</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={createTitle} onChange={
                                                    (e) => setcreateTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Description"
                                                value={createDescription}
                                                onChange={
                                                    (e) => setcreateDescription(e.target.value)
                                                }

                                            />
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span" >
                                                Submit
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                </Grid>

            </Grid>
        </div>
    )
}

export default MyCourse