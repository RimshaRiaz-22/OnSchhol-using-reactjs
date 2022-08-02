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
  }
})

function PerformanceStud(props) {
  const data = {
    labels: ['Assignments/Quizes Attempted', 'Assignments/Quizes Not Attempted'],
    datasets: [
      {
        label: '# of Votes',
        data: [props.data, 100 - props.data],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

          'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log('setting props ASSD');
  console.log(props.data)
  console.log(props.data1)
  console.log(props.data2)

  const classes = useStyles();
  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Button startIcon={
            <Avatar className={classes.iconstyle}><AssignmentIcon /></Avatar>
          }>
            <div className={classes.headStyle}>Performance</div>

            {/* <Typography variant='h6'> Performance</Typography> */}

          </Button>
          <Typography variant="h6" component="div">{props.data1}</Typography>
          <Typography variant="h5" component="div">
            <Doughnut data={data} />

          </Typography>

        </CardContent>
        {/* <CardActions>
                                            <Button size="small">View All</Button>
                                        </CardActions> */}
      </Card>
    </>
  )
}

export default PerformanceStud