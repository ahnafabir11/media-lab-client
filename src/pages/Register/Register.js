import './Register.css';
import * as Yup from "yup";
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container } from 'react-bootstrap';
import FieldTextError from '../../components/FieldTextError/FieldTextError';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const Register = () => {
    const classes = useStyles()
    const history = useHistory()
    const [alert, setAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [, setLoggedInUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        fullname: Yup.string().min(6, 'name must be at least 6 characters').max(16, 'name must be maximun 16 characters').required('Your name is required!'),
        email: Yup.string().email('enter valid email address').required('Email address required!'),
        phoneNumber: Yup.string().matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Enter a valid phone number").required('Your phone number is required!'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required('Password is required!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must be matched').required("Confirm password is required!")
    })

    const onSubmit = (values) => {
        setLoading(true)
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/checkUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setLoading(false)
                    setAlert(true)
                    setErrorMsg("Email or Phone Number already taken!")
                } else {
                    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/add_user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    })
                        .then(res => res.json())
                        .then(data => {
                            setLoading(false)
                            setErrorMsg(null)
                            setLoggedInUser(data)
                            history.push(`/profile/${data._id}`)
                        })
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
                        <h1 className="text-center">REGISTER</h1>
                        <Field name="fullname">
                            {
                                ({ field, meta }) =>
                                    <>
                                        <label className="register_field_label">Enter Your Full Name</label>
                                        <input
                                            type="text"
                                            className="register_custom_input"
                                            placeholder="Ahmed Hossen"
                                            {...field}
                                        />
                                        <ErrorMessage name="fullname" component={FieldTextError} />
                                    </>
                            }
                        </Field>

                        <Field name="email">
                            {
                                ({ field, meta }) =>
                                    <>
                                        <label className="register_field_label">Enter Your Email Address</label>
                                        <input
                                            type="text"
                                            className="register_custom_input"
                                            placeholder="example@example.com"
                                            {...field}
                                        />
                                        <ErrorMessage name="email" component={FieldTextError} />
                                    </>
                            }
                        </Field>

                        <Field name="phoneNumber">
                            {
                                ({ field, meta }) =>
                                    <>
                                        <label className="register_field_label">Enter Your Phone Number</label>
                                        <input
                                            type="text"
                                            className="register_custom_input"
                                            placeholder="01511122233"
                                            {...field}
                                        />
                                        <ErrorMessage name="phoneNumber" component={FieldTextError} />
                                    </>
                            }
                        </Field>

                        <Field name="password">
                            {
                                ({ field, meta }) =>
                                    <>
                                        <label className="register_field_label">Enter Your Password</label>
                                        <input
                                            type="password"
                                            className="register_custom_input"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        <ErrorMessage name="password" component={FieldTextError} />
                                    </>
                            }
                        </Field>

                        <Field name="confirmPassword">
                            {
                                ({ field, meta }) =>
                                    <>
                                        <label className="register_field_label">Confirm Your Password</label>
                                        <input
                                            type="password"
                                            className="register_custom_input"
                                            placeholder="Repeat your password"
                                            {...field}
                                        />
                                        <ErrorMessage name="confirmPassword" component={FieldTextError} />
                                    </>
                            }
                        </Field>

                        <button type="submit" className="custom_submit_btn">Register</button>
                        <p className="text-center mb-0 mt-2">
                            already have an account? {""}
                            <span className="suggestion_link" onClick={() => history.push(`/login`)}>Login</span>
                        </p>
                    </div>
                </Form>
            </Formik>

            <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert severity="error" onClose={handleCloseAlert}>{errorMsg}</Alert>
            </Snackbar>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="primary" />
            </Backdrop>
        </Container>
    )
}

export default Register;