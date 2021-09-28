import './Login.css';
import * as Yup from "yup";
import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container } from 'react-bootstrap';
import FieldTextError from '../../components/FieldTextError/FieldTextError';
import { UserContext } from '../../App';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const [, setLoggedInUser] = useContext(UserContext)
  const [alert, setAlert] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const { from } = location.state || { from: { pathname: "/" } }

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('enter valid email address').required('Email address required!'),
    password: Yup.string().min(6, "Password is wrong!").required('Password required!')
  })

  const onSubmit = (values) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values })
    })
      .then(res => res.json())
      .then(data => {
        if (data.length !== 0) {
          const user = data[0]
          setLoggedInUser(user)
          setLoginError(null)
          Cookies.set('sid', user._id, { expires: 7 })
          history.replace(from)
        } else {
          setAlert(true)
          setLoginError("invalid email or password!")
        }
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="login_field_container">
            <h1 className="text-center mt-3">LOGIN</h1>
            <Field name="email">
              {
                ({ field, meta }) =>
                  <>
                    <input
                      type="text"
                      className="custom_input"
                      placeholder="enter your email address"
                      {...field}
                    />
                    <ErrorMessage name="email" component={FieldTextError} />
                  </>
              }
            </Field>

            <Field name="password">
              {
                ({ field, meta }) =>
                  <>
                    <input
                      type="password"
                      className="custom_input"
                      placeholder="Enter your password"
                      {...field}
                    />
                    <ErrorMessage name="password" component={FieldTextError} />
                  </>
              }
            </Field>

            <button type="submit" className="custom_submit_btn">Login</button>
            <p className="text-center mb-0 mt-2">
              don't have an account? {" "}
              <span className="suggestion_link" onClick={() => history.push('/register')}>
                Register
              </span>
            </p>
          </div>
        </Form>
      </Formik>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error" onClose={handleCloseAlert}>{loginError}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;