import React, { useState } from 'react'
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
function MyCourse() {
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

    // Upload 
    const [createTitle, setcreateTitle] = useState("");
    const [createDescription, setcreateDescription] = useState("");

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
                                    Course Title
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <span style={textStyle}>
                                    Total Enrolled Students:
                                </span>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <span style={textStyle}>
                                    Course Code:
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
                                <span style={textStyle}>Description Here </span>

                            </Grid>
                            <hr style={hrStyle}></hr>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>Tutor </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2} md={2}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Tutor Name</Typography>
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
                                                        Course Name</Typography>



                                                </Grid>
                                                <Grid item xs={4} md={4}>
                                                    <img src={welcome} className={classes.imgCourse} />


                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TabContext value={value}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                                <Tab label="Stream" value="1" />
                                                                <Tab label="Classwork" value="2" />
                                                                <Tab label="People" value="3" />
                                                                <Tab label="Settings" value="4" />
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel value="1" style={GridBackground}>
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={1} md={1}>
                                                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                                                </Grid>
                                                                                <Grid item xs={11} md={11}>
                                                                                    <Typography variant='h6'>Tutor Posted a new Lecture</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    Description .................
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small"
                                                                        onClick={() => {
                                                                            viewLec()
                                                                        }}
                                                                    >View</Button>
                                                                </CardActions>
                                                            </Card>
                                                            {/* Second card 
                                                         */}

                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={1} md={1}>
                                                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                                                </Grid>
                                                                                <Grid item xs={8} md={8}>
                                                                                    <Typography variant='h6'>Tutor Posted a new Assignment</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={3} md={3}>
                                                                                    <Typography variant='h6' className={classes.due}>Due Date:</Typography>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={12}>
                                                                                    Description .................
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small"
                                                                        onClick={() => {
                                                                            viewLec()
                                                                        }}
                                                                    >View</Button>


                                                                </CardActions>
                                                            </Card>

                                                        </TabPanel>

                                                        <TabPanel value="2" style={GridBackground}>
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
                                                                                            }}>Material</Button>
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
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(true);
                                                                                            }}>Update</Button>

                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(true);
                                                                                                setshowUploadUpdate(false);
                                                                                            }}>Class Link</Button>

                                                                                        </Grid>
                                                                                    </Grid>





                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>

                                                            </Card>

                                                        </TabPanel>
                                                        <TabPanel value="3">
                                                            dfdg

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
                                                                                            <input className={classes.InputStyle} name="password"
                                                                                                //  value={inputPassword}
                                                                                                type="text" placeholder="Enter Password"
                                                                                            // onChange={
                                                                                            //     (e) => setInputPassword(e.target.value)
                                                                                            // }
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={12}>
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
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(true);
                                                                                            }}>Update</Button>

                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(true);
                                                                                                setshowUploadUpdate(false);
                                                                                            }}>Class Link</Button>

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