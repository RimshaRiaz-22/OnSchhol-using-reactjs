import React,{useState} from 'react'
import { Grid,Avatar,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import image from './logo.png'
import Swal from 'sweetalert2';
import url from '../Components/url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const useStyles = makeStyles({
    logoStyle:{
        width: '60%',
        height: '100%',
        marginBottom: '10px'
    },
    box:{
        backgroundColor:'#f3f3f3',
        boxShadow:' none',
        borderRadius: '3px',
        paddingRight: '35px',
        paddingLeft: '35px',
    }, InputStyle: {
        border: ' 1px solid #2d2d3f',
        borderRadius: '4px',
        width: '87%',
        height: '15px',
        padding: '20px'
    },btn: {
        // width: '99%',
        marginTop: '20px',
        marginBottom: '20px',
        borderColor: ' #1379C8',
        color: '#fff',
        border: '1px solid #1379C8',
        backgroundColor: '#1379C8',
        padding: '10px'
    }

})
const headers = {
    'Content-Type': 'application/json'
}

function ForgetPassword() {
    const classes = useStyles();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    let navigate = useNavigate();

    // submit handler 
const submitHandler = async (e) => {
    e.preventDefault()
        // POst Request 
        await axios.put(`${url}user/update-password`, {
            email: email,
            password: password
        }, { headers }).then(response => {
            console.log(response)

            let timerInterval
            Swal.fire({
                title: 'Password Changed Successfully',
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
  return (
    <div>
        <Grid container>
            <Grid item xs={3} md={3}></Grid>
            <Grid item xs={12} md={6} >
                <Grid container>
                    <Grid item xs={12} md={12}>
                <Avatar src={image} variant="square" className={classes.logoStyle} />

                    </Grid>
                    <Grid item xs={12} md={12} className={classes.box}>
                        <h3>Forgot Password ?</h3>
                        <p>Enter Here the email address you have registered with.</p>
                        <input className={classes.InputStyle} name="email"
                             value={email}
                            type="text" placeholder="Enter Email"
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                        />
                        <p>Type new password.</p>

                         <input className={classes.InputStyle} name="password"
                             value={password}
                            type="password" placeholder="Enter Password"
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        />
                        <Button variant="contained"
                            onClick={
                                submitHandler

                            }
                            className={classes.btn} >Submit</Button>
                        

                    </Grid>
                </Grid>
            
            </Grid>
            <Grid item xs={3} md={3}></Grid>
        </Grid>
    </div>
  )
}

export default ForgetPassword