import { Grid, Typography } from '@material-ui/core'
import React from 'react'
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
        borderRadius:'10px',
        width:'100%'
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
function Dashboard() {
    const classes = useStyles();
    // chart 
    ChartJS.register(ArcElement, Tooltip, Legend);


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    {/* Heading  */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Quickstart</Typography>
                        </Grid>
                    </Grid>
                    {/* Cards */}
                    <Grid container spacing={2} className={classes.marginT}>
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined" className={classes.btn} startIcon={<VideoLibraryIcon />}>
                                Videos
                            </Button>

                        </Grid>
                        {/* second card  */}
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined" className={classes.btn} startIcon={<AssignmentIcon />}>
                                StudyPlanner
                            </Button>

                        </Grid>
                        {/* 3rd card  */}
                        <Grid item xs={12} md={4} >
                            <Button variant="outlined" className={classes.btn} startIcon={<ClassIcon />}>
                                Classes
                            </Button>

                        </Grid>

                    </Grid>
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
                                                <Avatar className={classes.iconstyle}><VideoLibraryIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Videos</div>
                                                {/* <Typography variant='h6' className={classes.headStyle}> Videos</Typography> */}

                                            </Button>
                                            <CardActions>
                                                <Button size="small">View All</Button>
                                            </CardActions>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Freelancing"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Web Development"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Andriod App"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                </List>

                                            </Typography>


                                        </CardContent>

                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><ClassIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}> All Courses</div>
                                                {/* <Typography variant='h6'> All Courses</Typography> */}

                                            </Button>
                                            <CardActions>
                                                <Button size="small">View All</Button>
                                            </CardActions>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Freelancing"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Web Development"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText className={classes.listStyle}
                                                            primary="Andriod App"

                                                        />
                                                        <ChevronRightIcon className={classes.listStyle} />
                                                    </ListItem>
                                                </List>

                                            </Typography>

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
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <StickyNote2Icon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Notes 1" secondary="Due Date:Jan 9, 2014" />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <StickyNote2Icon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Notes 2" secondary="Due Date:Jan 7, 2014" />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />

                                                </List>
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>


                            {/* <Typography variant='h5'>Cards</Typography> */}
                            {/* Second Card  */}


                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}>Performance</div>

                                                {/* <Typography variant='h6'> Performance</Typography> */}

                                            </Button>
                                            <Typography variant="h6" component="div">Web Development</Typography>
                                            <Typography variant="h5" component="div">
                                                <Doughnut data={data} />

                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Button startIcon={
                                                <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
                                            }>
                                                <div className={classes.headStyle}> Study Planner</div>

                                                {/* <Typography variant='h6'> Study Planner</Typography> */}

                                            </Button>
                                            <Typography variant="h5" component="div">
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <AssignmentLateIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Assignment 1" secondary="Due Date:Jan 9, 2014" />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <AssignmentLateIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Assignment 2" secondary="Due Date:Jan 7, 2014" />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />

                                                </List>
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions>
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