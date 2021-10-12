import './UserVerification.css';
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import * as firebase from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebaseConfig from '../../firebase'
import { Container } from 'react-bootstrap';
import { UserContext } from './../../App';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
firebase.initializeApp(firebaseConfig)

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))


const UserVerification = () => {
  const classes = useStyles()
  const history = useHistory()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [sendOtpBtn, setSendOtpBtn] = useState(false)
  const [otpValue, setOtpValue] = useState(null)
  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState('error')
  const [alertMessage, setAlertMessage] = useState("")
  const [otpsend, setOtpsend] = useState(false)
  const [loading, setLoading] = useState(false)

  const configurCaptcha = () => {
    setOtpsend(false)
    setSendOtpBtn(true)
    const auth = getAuth();
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    const phoneNumber = loggedInUser.phoneNumber;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false)
        setAlertMessage("OTP has been send")
        setAlertType('success')
        setAlert(true)
        setOtpsend(true)
      }).catch((error) => {
        setLoading(false)
        setAlertMessage("OTP has not been send, Please try again later.")
        setAlertType('error')
        setAlert(true)
        setOtpsend(true)
      })
  }

  const handleOTPsubmit = () => {
    setLoading(true)
    window.confirmationResult.confirm(otpValue).then((result) => {
      fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loggedInUser._id, verified: true }),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false)
          setLoggedInUser(data)
          history.push(`/profile/${loggedInUser._id}`)
        })
    }).catch((error) => {
      setLoading(false)
      setAlertMessage("You have entered wrong OTP code")
      setAlertType('error')
      setAlert(true)
    })
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false)
  }

  return (
    <Container>
      <h3 className="text-center mt-5">Please verify your phone number</h3>
      <p className="text-center">Send OTP to your phone number : +880{loggedInUser.phoneNumber}</p>
      {!otpsend && <div id="recaptcha-container" className="d-flex justify-content-center mb-3"></div>}
      <Button
        variant="contained"
        color="primary"
        className={sendOtpBtn ? "d-none" : "d-block mx-auto"}
        onClick={configurCaptcha}
      >send otp</Button>

      <div className={sendOtpBtn ? "d-flex align-items-center justify-content-center" : "d-none"}>
        <input
          type="text"
          onChange={(e) => setOtpValue(e.target.value)}
          className="otp_input"
          placeholder="ENTER OTP CODE HERE"
        />
        <Button
          variant="contained"
          color="primary"
          className="ml-3"
          onClick={handleOTPsubmit}
        >Submit</Button>
      </div>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity={alertType} onClose={handleCloseAlert}>{alertMessage}</Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default UserVerification;