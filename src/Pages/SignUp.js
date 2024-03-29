import { Grid, Button, Avatar, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import image from './logo.png'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import ClipLoader from "react-spinners/ClipLoader";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import url from '../Components/url'

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
        height:'48px',
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
const override = {
    display: ' block',
    margin: '0 auto',
}
const color = "black"

function SignUp() {
    const [inputUsername, setInputUsername] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [loading1, setLoading1] = useState(false);

    const [session, setSession] = useState("");
    const [error, setError] = useState([]);
    const classes = useStyles();
    // Navigation 
    let navigate = useNavigate();
    // SignUp
    const signIN = async (e) => {
        navigate('/');
    }
    //Forget Password
    const ForgetPass = async (e) => {
        navigate('/forgetpass')
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // Submit handler 
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading1(true)
        setTimeout(() => {
            setLoading1(false)
        }, 3000)
        if (inputUsername == "") {
            Swal.fire({
                title: 'Fill All Fields',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

        } else if (inputEmail == "") {
            Swal.fire({
                title: 'Fill All Fields',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

        } else if (inputPassword == "") {
            Swal.fire({
                title: 'Fill All Fields',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

        } else {
            // POst Request 
            await axios.post(`${url}user/create`, {
                name: inputUsername,
                email: inputEmail,
                password: inputPassword
            }, { headers }).then(response => {
                console.log(response)
                const session1 = response.data.session;

                setSession(response.data.session);
                console.log(session1);

                let timerInterval
                Swal.fire({
                    title: 'SignUp Successfull',
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
                navigate('/');
            })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        title: 'Invalid Credentials',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                })
        }

    }
    return (
        <div>
            <Grid container className={classes.ContainerStyle}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.gridCont}>
                    <Grid align='center'>

                        <Avatar src={image} variant="square" className={classes.logoStyle} />
                        <Typography variant='h6'>Create your free account now</Typography>
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
                            className={classes.btn} >
                            {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h3>Login</h3>}
                        </Button>

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