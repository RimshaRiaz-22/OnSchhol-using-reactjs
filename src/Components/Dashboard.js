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






const useStyles = makeStyles({
    btn: {
        width:'100%'
    },marginT:{
        marginTop:'20px'
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

function Dashboard() {
    const classes = useStyles();
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
                            <Button variant="outlined" className={classes.btn} startIcon={<BookmarksIcon />}>
                                Bookmarks
                            </Button>

                        </Grid>
                        
                    </Grid>
                    {/* Heading  */}
                    <Grid container spacing={2} className={classes.marginT}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Overview</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} md={2}></Grid>
            </Grid>

        </div>
    )
}

export default Dashboard