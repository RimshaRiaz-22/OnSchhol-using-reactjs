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
import AssignmentIcon from '@mui/icons-material/Assignment';
import image from './Images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Dashboard from './Dashboard';
import Bookmarks from './Bookmarks';
import LearningPaths from './LearningPaths';
import Logout from './Logout';
import Notes from './Notes';
import LegalInfo from './LegalInfo';
import StudyPlanner from './StudyPlanner';
import Videos from './Videos';
import ClassIcon from '@mui/icons-material/Class';
import AllCourses from './AllCourses';

import DialogContentText from '@mui/material/DialogContentText';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@material-ui/core';

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
  }, BackGround: {
    // backgroundColor: '#181821',
    // color: 'white',
    borderBottom: ' 1px solid #262635',
    paddingLeft: '65px'

},BackGroundMain:{
    backgroundColor:'#f5f5f5'

}, iconColor: {
    color: '#6c7073'
}, iconColorMenu: {
    color: 'white'

}, searchinput: {
    display: 'flex',
    flexDirection: 'row-reverse',

}, appicons: {
    display: 'flex',
    flexDirection: 'row-reverse',

},btn:{
  width:'100%'

},
Header: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '500',
    height: '30px',
    margin: '18px auto',
    display: 'block',
    color: '#83d8ae'
}, ListStyle1: {
    marginTop: '-10px'
}, listStyle: {
    // backgroundColor: '#1f1f2b',
    // color: 'white',
    height: '100%'
},account:{
    marginTop:'10px'
}
})
const heading = {
  marginBottom: '-20px'
}

const Performance = (props) => {

  console.log('setting props');
  console.log(props.data)
  const classes = useStyles();

  //Get API Axios Update-km-per hour



  const headers = {
    'Content-Type': 'application/json'
  }
  const [EnrolledClasses,setEnrolledClasses]=useState([])
  const UserIdData = props.data;
    const getAllData = () => {
                axios.get(`${url}user/get`, {
                    params: {
                        _id: UserIdData
                    }
                })
                    .then((response) => {
                        const allData1 = response.data;
                        console.log(response.data);
                        setEnrolledClasses(response.data.enrolledClasses)
                        console.log(EnrolledClasses);
                    })
                    .catch(error => console.error(`Error:${error}`));
                // setLoading(true)
    }

    // Get all Enrolled Courses
const [dataEnrolled, setDataEnrolled] = useState([]);
const [loadingEnroll, setLoadingEnroll] = useState(false);
const [showPerformance, setshowPerformance] = useState(false);
const [dataPerformance, setDataPerformance] = useState([]);
const [courseName, setCourseName] = useState([]);



const getAllDataEnrolled = () => {
    axios.get(`${url}class/get-enrolled-classes`, {
      params: {
          _id: UserIdData
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
let navigate = useNavigate();

const OpenPerformance = (CourseId,CourseName) => {
  console.log(CourseId);
  // setCourseName(CourseName);
  // OpenPerformanceDialog(CourseId);
  axios.get(`${url}get-user-performance`, {
    params: {
      class:CourseId,
      submittedBy: UserIdData
    }
})
    .then((response) => {
        const allData1 = response.data;
        console.log(allData1.percentage);
        setDataPerformance(allData1.percentage)
        console.log(dataPerformance)
        // setshowPerformance(true);
         // Navigate 
  navigate('/performance'
  ,
  {
      state: {
          courseId: allData1.percentage,
          courseName:CourseName,
          userId:props.data
      }
  }
);

        // setOwnerId(allData1.name);
    })
    .catch(error => console.error(`Error:${error}`));
 

}
const OpenPerformanceDialog = (CourseId) => {
  console.log(CourseId);
    axios.get(`${url}get-user-performance`, {
    params: {
      class:CourseId,
      submittedBy: UserIdData
    }
})
    .then((response) => {
        const allData1 = response.data;
        console.log(allData1);
        setDataPerformance(response.data.percentage)
        setshowPerformance(true);

        // setOwnerId(allData1.name);
    })
    .catch(error => console.error(`Error:${error}`));
// setLoading(true)


}

  useEffect(() => {
    getAllData();
    getAllDataEnrolled();

  }, []);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>

          <Grid container spacing={2} className={classes.GridStyle}>
            <Grid item xs={12} md={12}>
              <Typography variant='h6' style={heading}>Performance</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.GridStyle}>
          <Grid item xs={12} md={12}> 
          <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Button>
                            <div className={classes.headStyle}> Enrolled Courses</div>
                            {/* <Typography variant='h6' className={classes.headStyle}> Videos</Typography> */}

                          </Button>

                        </Grid>
                        {loadingEnroll && dataEnrolled.map((row) => (
                        <Grid item xs={12} md={4}>
                        <Button variant="outlined" className={classes.btn}
                         onClick={() => OpenPerformance(row._id,row.name)}>
                                {row.name}
                            </Button>
                        </Grid>
                        ))}
                       

                      </Grid>






                    </CardContent>

                  </Card></Grid>
            <Grid item xs={12} md={6}>
 {showPerformance ?
                        <>

            <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Performance</div>

                                                {/* <Typography variant='h6'> Performance</Typography> */}

                                            </Button>
                                            <Typography variant="h6" component="div">{courseName}</Typography>
                                            <Typography variant="h5" component="div">
                                                {/* <Doughnut data={data} /> */}

                                            </Typography>

                                        </CardContent>
                                        {/* <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions> */}
                                    </Card>
                                    </>
                                    :null}
            </Grid>
          </Grid>







        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </>

  )
}

export default Performance