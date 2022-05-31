import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import url from './url'

const useStyles = makeStyles({
    GridStyle: {
        border: ' 1px solid #e4e6ef',
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
    }
})

const heading = {
    marginBottom: '30px'
}
const btn = {
    width: '100%',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: '#1976d2',
    borderColor: '#ada6f2'
}
const LegalInfo = (props) => {
    console.log('setting props');
    console.log(props.data)
    const classes = useStyles();
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    //Get API Axios Update-km-per hour

    useEffect(() => {
        getAllData2();
    }, []);
    const headers = {
        'Content-Type': 'application/json'
    }

    //Admin Credentials 
    const [data2, setData2] = useState([]);
    const [pass2, setPass2] = useState([]);
    const [IdData, setIdData] = useState([]);
    const [fullname2, setFullName2] = useState([]);
    const getAllData2 = () => {
        axios.get(`${url}user/get`, {
            params: {
                _id: props.data
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log('get profile state')
                console.log(allData);
                setData2(allData.email);
                setPass2(allData.password)
                setIdData(allData._id);
                setFullName2(allData.name);
               
            })
            .catch(error => console.error(`Error:${error}`));
    }
    // edit-admin-password
    const submitHandler2 = (e) => {
        e.preventDefault()
        // POst Request 
        axios.put(`${url}user/update-password`, {
            email: data2,
            password: pass2
        }, { headers }).then(response => {
            console.log(data2);
            setOpen2(true);
        })
            .catch(err => {
                console.log(err)
            })
    }
    // edit-admin-profile
    const submitHandler3 = (e) => {
        e.preventDefault()
        // POst Request 
        axios.put(`${url}user/update-profile`, {
            _id: IdData,
            name: fullname2,
        }, { headers }).then(response => {
            console.log(data2);
            setOpen3(true);
        })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <Grid container spacing={2} className={classes.GridStyle}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h6' style={heading}>LegalInfo</Typography>
                </Grid>
                {/* Update admin credential  */}
                <Grid item xs={12} md={6}  >
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12} className={classes.GridBoxStyle}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6'>Admin Credentials</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Collapse in={open2}>
                                                <Alert
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpen2(false);
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="inherit" />
                                                        </IconButton>
                                                    }
                                                    sx={{ mb: 2 }}
                                                >
                                                    Updated Successfully
                                                </Alert>
                                            </Collapse>
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <input className={classes.InputStyle} name="email" type="text" placeholder="Enter Email"
                                                value={data2}
                                                onChange={
                                                    (e) => setData2(e.target.value)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <input className={classes.InputStyle} name="password" type="text" placeholder="Enter Password"
                                                onChange={
                                                    (e) => setPass2(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Button variant="contained" style={btn} onClick={submitHandler2}>Update</Button>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Update admin profile  */}
                <Grid item xs={12} md={6}  >
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12} className={classes.GridBoxStyle}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6'>Update Profile</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Collapse in={open3}>
                                                <Alert
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpen3(false);
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="inherit" />
                                                        </IconButton>
                                                    }
                                                    sx={{ mb: 2 }}
                                                >
                                                    Updated Successfully
                                                </Alert>
                                            </Collapse>
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <input className={classes.InputStyle} name="fullName" type="text" placeholder="Enter Full Name"
                                                value={fullname2}
                                                onChange={
                                                    (e) => setFullName2(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    
                                      
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Button variant="contained" style={btn} onClick={submitHandler3}>Update</Button>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default LegalInfo