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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ClassIcon from '@mui/icons-material/Class';
import { Avatar } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';




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
  },marginCard:{
    marginTop:'110px'
  },btn:{
    width:'100%'
  },videoCard:{
    paddingTop:'50px'
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
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log('setting props');
  console.log(props.data)
  const classes = useStyles();

  //Get API Axios Update-km-per hour


  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState([]);
  const headers = {
    'Content-Type': 'application/json'
  }
  const [data, setData] = useState([]);

  const getAllData = () => {
    axios.get(`${url}class-video/get-all`)
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
  // useEffect(() => {
  //   getAllData();
  // }, []);
  // Get all Enrolled Courses
  const UserIdData=props.data
const [dataEnrolled, setDataEnrolled] = useState([]);
const [dataVideos, setDataVideos] = useState([]);

const [loadingEnroll, setLoadingEnroll] = useState(false);
const [showPlaylist, setshowPlaylist] = useState(false);



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

const OpenPlaylist = (CourseId) => {
  console.log(CourseId);
  OpenPlaylistDialog(CourseId);

}
const OpenPlaylistDialog = (CourseId) => {
  console.log(CourseId);
    axios.get(`${url}class-video/get-class-videos`, {
    params: {
      _id:CourseId,
      
    }
})
    .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataVideos(allData);
        setshowPlaylist(true);

    })
    .catch(error => console.error(`Error:${error}`));
// setLoading(true)


}

  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={2}></Grid> */}
        <Grid item xs={12} md={12}>

          <Grid container spacing={2} className={classes.GridStyle}>
            <Grid item xs={12} md={12}>
              <Typography variant='h6' style={heading}>All Videos</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
            <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Playlists" value="1" />
            <Tab label="Classes Playlists" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
           {data.map((datavid, idx) => (

            <Grid item xs={12} md={4}>

              {/* <Card variant="outlined">
                <>
                  <CardContent> */}
                    {/* {data.map((datavid, idx) => ( */}
                      <>
                        <video   controls>
                          <source src={`${url}${datavid.path}`} type="video/mp4" />
                          <source src={`${url}${datavid.path}`} type="video/ogg" />
                          Your browser does not support HTML video.
                        </video>
                        <br />
                      </>
                    {/* ))} */}
                  {/* </CardContent>

                </>
              </Card> */}

            </Grid>
                    ))}
        </TabPanel>
        <TabPanel value="2">
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
                         onClick={() => OpenPlaylist(row._id)}
                         >
                                {row.name}
                            </Button>
                        </Grid>
                        ))}
                       

                      </Grid>






                    </CardContent>

                  </Card>

                  {showPlaylist ?
                        <>

{dataVideos.map((datavid, idx) => (

<Grid item xs={12} md={4} className={classes.videoCard}>
          <>
            <video   controls>
              <source src={`${url}${datavid.path}`} type="video/mp4" />
              <source src={`${url}${datavid.path}`} type="video/ogg" />
              Your browser does not support HTML video.
            </video>
            <br />
          </>

</Grid>
        ))}
                                    </>
                                    :null}
        </TabPanel>
      </TabContext>
            </Grid>
        

            {/* <Grid item xs={12} md={12}>
          <Grid container spacing={2}> */}
            {/* {loading && data.map((row) => ( */}
           

            {/* ))} */}
            {/* </Grid>
        </Grid> */}


          </Grid>
          {/* Dialog */}
          
          {/* Dialog End  */}
        </Grid>
        <Grid  item xs={12} md={4}>
        </Grid>
      </Grid>
    </>

  )
}

export default Videos