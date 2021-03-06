import { Grid, Button, Avatar, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import image from './logo.png'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from "axios";
import Cookies from "universal-cookie";


const useStyles = makeStyles({
    logoStyle: {
        width: '82%',
        height: '100%',
        marginBottom: '10px'
    }, ContainerStyle: {
        padding: '30px',
        paddingTop: '63px',
        color: '#9a9cab',
    }, btn: {
        width: '99%',
        marginTop: '20px',
        marginBottom: '20px',
        borderColor: ' #1379C8',
        color: '#fff',
        border: '1px solid #1379C8',
        backgroundColor: '#1379C8',
        padding: '10px'
    }, btnsocial: {
        width: '99%',
        marginTop: '5px',
        marginBottom: '0px',
        color: 'black',
        borderColor: '#ada6f2',
        padding: '10px'
    }, InputStyle: {
        border: ' 1px solid #2d2d3f',
        borderRadius: '4px',
        width: '87%',
        height: '15px',
        padding: '20px'
    }, headingStyle1: {
        fontSize: '12px',
        margin: '0'
    },
    headingStyle: {
        fontSize: '12px',
    }, gridCont: {
        padding: '30px',
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '-70px'
    }, override: {
        display: ' block',
        margin: '0 auto',
    }, link: {
        color: '#1379C8',
        cursor: 'pointer'
    }, checkbox: {
        color: 'black',
        fontSize: '12px'

    }
})


const heading = "------------ OR ------------";
const URL = 'http://localhost:5000';




function SignUp() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [error, setError] = useState([]);
    const classes = useStyles();
    // Navigation 
    let navigate = useNavigate();
    // SignUp
    const signIN = async (e) => {
        navigate('/signin');
    }
    //Forget Password
    const ForgetPass = async (e) => {
        navigate('/forgetpass')
    }

    // Submit handler 
    const submitHandler = async (e) => {
        console.log('awws')
        e.preventDefault();

        // if (error === "") {
            await Axios.post(`${URL}/users/register`, { email: inputEmail, username: inputUsername, password: inputPassword })
                .then(res => {
                    const token = new Cookies();
                    token.set('token', res.data.token, { path: '/', maxAge: 604800 })
                    console.log(res)
                    //return to home page
                    let timerInterval
                    Swal.fire({
                        title: 'Login Successfull',
                        html: 'Please wait !',
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
                    navigate('/home');
                })
                .catch(err =>{

                    setError(err.response.data.message)
                    console.log('error')
                    console.log(error)

                });
        // }
        // e.preventDefault()
        // POst Request 
        // await axios.put('https://hiiguest.com/login-admin-profile', {
        //     email: email,
        //     password: password
        // }, { headers }).then(response => {
        //     console.log(response)
        //     const session1 = response.data.session;

        // console.log(response.data.session);

        // Login Successfull Alert 



        // })
        // .catch(err => {
        // console.log(err)
        // -----Invalid Credential----
        // Swal.fire({
        //     title: 'Invalid Credentials',
        //     showClass: {
        //         popup: 'animate__animated animate__fadeInDown'
        //     },
        //     hideClass: {
        //         popup: 'animate__animated animate__fadeOutUp'
        //     }
        // })
        // -----Invalid Credential---
        // })
    }
    useEffect(() => {
        if (inputEmail.length > 0) setError('');
    }, [inputEmail])

    //validating users' input
    // useEffect(() => {
    //     if (inputUsername.length < 3 && inputUsername.length !== 0) setError("Username length should be more than or equal to three");
    //     else if (inputUsername.length > 50) setError('Username length should be less or equal to 50');
    //     else setError('');
    // }, [inputPassword, inputPasswordConfirmation, inputUsername])
    return (
        <div>
            <Grid container className={classes.ContainerStyle}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.gridCont}>
                    <Grid align='center'>

                        <Avatar src={image} variant="square" className={classes.logoStyle} />
                        <Typography variant='h6'>Create your free account now</Typography>
                        <Button variant="outlined" className={classes.btnsocial} startIcon={<GoogleIcon />}>
                            CONTINUE WITH GOOGLE
                        </Button>
                        <Button variant="outlined" className={classes.btnsocial} startIcon={<FacebookIcon />}>
                            CONTINUE WITH FACEBOOK
                        </Button>
                        <Button variant="outlined" className={classes.btnsocial} startIcon={<LinkedInIcon />}>
                            CONTINUE WITH LIKEDIN
                        </Button>
                        <h6 className={classes.headingStyle}>{heading}</h6>
                        <input className={classes.InputStyle} name="username"
                            value={inputUsername}
                            type="text" placeholder="Enter UserName"
                            onChange={
                                (e) => setInputUsername(e.target.value)
                            }
                        />
                        <br /><br />
                        <input className={classes.InputStyle} name="email"
                            value={inputEmail}
                            type="text" placeholder="Enter Email"
                            onChange={
                                (e) => setInputEmail(e.target.value)
                            }

                        />
                        <br /><br />
                        <input className={classes.InputStyle} name="password"
                            value={inputPassword}
                            type="password" placeholder="Enter Password"
                            onChange={
                                (e) => setInputPassword(e.target.value)
                            }
                        />
                        <br /><br />


                        <br />
                        <FormGroup>
                            <FormControlLabel className={classes.checkbox} control={<Checkbox defaultChecked />} label="I accept OnSchool Terms and Conditions" />
                        </FormGroup>
                        <Button variant="contained"
                            onClick={
                                submitHandler

                            }
                            className={classes.btn} >SignUp</Button>

                        <h6 className={classes.headingStyle1}>You are already registered? <span className={classes.link}
                            onClick={
                                signIN
                            }
                        > Login</span></h6>
                        <h6 className={classes.headingStyle1}><span className={classes.link}
                            onClick={
                                ForgetPass
                            }
                        >Forget Password?</span></h6>

                    </Grid>

                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} ></Grid>
            </Grid>
        </div>
    )
}

export default SignUp