import React from 'react'
import { Grid,Avatar,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import image from './logo.png'
import Swal from 'sweetalert2';




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


function ForgetPassword() {
    const classes = useStyles();
    // submit handler 
const submitHandler = async (e) => {
    Swal.fire({
        title: 'Password Changed Link has been send to your email',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
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
                            //  value={email}
                            type="text" placeholder="Enter Email"
                        // onChange={
                        //     (e) => setEmail(e.target.value)
                        // }
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