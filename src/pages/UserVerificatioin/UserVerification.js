import './UserVerification.css';
import React, { useContext, useState } from 'react';
import * as firebase from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebaseConfig from '../../firebase'
import { Container } from 'react-bootstrap';
import { UserContext } from './../../App';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
firebase.initializeApp(firebaseConfig)

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />


const UserVerification = () => {
  const history = useHistory()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [sendOtpBtn, setSendOtpBtn] = useState(false)
  const [otpValue, setOtpValue] = useState(null)
  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState('error')
  const [alertMessage, setAlertMessage] = useState("")
  const [otpsend, setOtpsend] = useState(false)

  const configurCaptcha = () => {
    setOtpsend(false);
    setSendOtpBtn(true)
    const auth = getAuth();
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    const phoneNumber = "+880" + loggedInUser.phoneNumber;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setAlertMessage("OTP has been send")
        setAlertType('success')
        setAlert(true)
        setOtpsend(true)
      }).catch((error) => {
        setAlertMessage("OTP has not been send, Please try again later.")
        setAlertType('error')
        setAlert(true)
        setOtpsend(true)
      })
  }

  const handleOTPsubmit = () => {
    window.confirmationResult.confirm(otpValue).then((result) => {
      fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loggedInUser._id, verified: true }),
      })
        .then(res => res.json())
        .then(data => {
          setLoggedInUser(data)
          history.push(`/profile/${loggedInUser._id}`)
        })
    }).catch((error) => {
      setAlertMessage("You have entered wrong OTP code")
      setAlertType('error')
      setAlert(true)
    });
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
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
    </Container>
  );
};

export default UserVerification;