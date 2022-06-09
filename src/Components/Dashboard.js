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
import LinearProgress from '@mui/material/LinearProgress';
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
import axios from 'axios';
import url from './url';

const useStyles = makeStyles({
    btn: {
        width: '100%'
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
        // fontSize:'20px',
        color: 'black',
        fontSize: ' 1.25rem',
        fontWeight: '200',
        lineHeight: ' 1.2'
    },
    appbtn: {
        borderRadius: '10px',
        width: '100%'
    }

})
const styleBtn = {
    border: ' none',
    width: '70px',
    height: '70px',
    fontSize: ' 32px',
    cursor: 'pointer',
    borderRadius: '24px',

}
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
// Progress 
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
function Dashboard(props) {
    // chart 
    ChartJS.register(ArcElement, Tooltip, Legend);
    // Get all Enrolled Courses
    const [dataEnrolled, setDataEnrolled] = useState([]);
    const [loadingEnroll, setLoadingEnroll] = useState(false);
    const [showPerformance, setshowPerformance] = useState(false);
    const [dataPerformance, setDataPerformance] = useState([]);
    const [courseName, setCourseName] = useState([]);



    const getAllDataEnrolled = () => {
        axios.get(`${url}class/get-enrolled-classes`, {
            params: {
                _id: props.data
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log('all Enrolled Data');
                console.log(allData);
                setDataEnrolled(response.data);
                setLoadingEnroll(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }

    const [progress, setProgress] = React.useState(0);

    // React.useEffect(() => {
    //   const timer = setInterval(() => {
    //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    //   }, 800);
    //   return () => {
    //     clearInterval(timer);
    //   };
    // }, []);
    const classes = useStyles();
    const [loading, setLoading] = useState([]);

    const [data1, setData1] = useState([]);
    const getAllData1 = () => {
        const idData = props.data;
        console.log(idData)
        axios.get(`${url}notes/get-user-notes`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('get notes user')
                console.log(response);
                const allData = response.data;
                setData1(allData);
                console.log(data1)

            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [dataStream, setDataStream] = useState([]);
    const getAllDataStream = () => {
        const idData = props.data;
        console.log(idData)
        axios.get(`${url}stream/get-all`)
            .then((response) => {
                console.log('Get Streams All')
                console.log(response);
                const allData = response.data;
                setDataStream(allData.slice(0, 5));
                console.log(dataStream)

            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data2, setData2] = useState([]);
    const getAllData2 = () => {
        const idData = props.data;
        console.log(idData)
        axios.get(`${url}class/get-owner-classes`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('get class user')
                console.log(response);
                const allData = response.data;
                //   .slice(0,3)
                setData2(allData);
                console.log(data2)

            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData1();
        getAllData2();
        getAllDataStream();
        getAllDataEnrolled();
    }, []);




    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    {/* Heading  */}
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Quickstart</Typography>
                        </Grid>
                    </Grid> */}
                    {/* Cards */}
                    {/* <Grid container spacing={2} className={classes.marginT}>
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined"  className={classes.btn} startIcon={<ClassIcon  />}>
                                Courses
                            </Button>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined"  className={classes.btn} startIcon={<AssignmentIcon />}>
                                Notes
                            </Button>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined" className={classes.btn} startIcon={<ClassIcon />}>
                                Stream
                            </Button>

                        </Grid>

                    </Grid> */}
                    {/* Heading  */}
                    <Grid container spacing={2} className={classes.marginT}>
                        <Grid item xs={12} md={12}>
                            <Typography variant='h5'>Overview</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* First Cards  */}
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><ClassIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle} > Your Courses</div>
                                                {/* <Typography variant='h6'> All Courses</Typography> */}

                                            </Button>

                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    {loading && data2.map((row) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <StickyNote2Icon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={row.name} secondary={row.description} />
                                                            </ListItem>

                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    ))}
                                                </List>

                                            </Typography>
                                            {/* <CardActions>
                                                <Button size="small">View All</Button>
                                            </CardActions> */}

                                        </CardContent>

                                    </Card>

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><StickyNote2Icon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Notes</div>

                                                {/* <Typography variant='h6'> Notes</Typography> */}
                                            </Button>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    {loading && data1.map((row) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <StickyNote2Icon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={row.details} secondary={row.date} />
                                                            </ListItem>

                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    ))}
                                                </List>
                                            </Typography>

                                        </CardContent>
                                        {/* <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions> */}
                                    </Card>
                                </Grid>
                                {/* Study Planner  */}
                                {/* <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><StickyNote2Icon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Study Planner</div>

                                            </Button>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                {loading && data1.map((row) => (
                                                    <>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <StickyNote2Icon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={row.details} secondary={row.date} />
                                                    </ListItem>

                                                    <Divider variant="inset" component="li" />
                                                    </>
                                                ))}
                                                </List>
                                            </Typography>

                                        </CardContent>
                                       
                                    </Card>
                                </Grid> */}
                            </Grid>


                            {/* </Grid> */}


                            {/* <Typography variant='h5'>Cards</Typography> */}
                            {/* Second Card  */}


                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>

                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Performance</div>


                                            </Button>
                                            {loading && dataEnrolled.map((row) => (
                                                <>
                                                    <Typography variant="h6" component="div">{row.name}</Typography>
                                                    <Typography variant="h5" component="div">
                                                         <Doughnut data={data} /> 
                                                        <LinearProgressWithLabel value={progress} />

                                                    </Typography>
                                                </>))}
                                        </CardContent>
                                    
                                    </Card>
                                </Grid> */}
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><StickyNote2Icon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Latest News</div>

                                                {/* <Typography variant='h6'> Notes</Typography> */}
                                            </Button>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    {loading && dataStream.map((row) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <StickyNote2Icon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={row.title} secondary={row.details} />
                                                            </ListItem>

                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    ))}
                                                </List>
                                            </Typography>


                                        </CardContent>
                                    </Card>

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Mobile Apps</div>

                                                {/* <Typography variant='h6'> Mobile Apps</Typography> */}

                                            </Button>
                                            <Typography variant="h5" component="div" className={classes.textStyle}>
                                                Download our iOS or Android app to learn anywhere and anytime—even when you‘re offline.
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">
                                                <Avatar src={Img} variant="square" className={classes.appbtn} ></Avatar>

                                            </Button>
                                            <Button size="small">
                                                <Avatar src={Imgs} variant="square" className={classes.appbtn} ></Avatar>

                                            </Button>
                                        </CardActions>
                                    </Card>

                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={2} md={2}></Grid>
            </Grid>

        </div>
    )
}

export default Dashboard