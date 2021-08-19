import './Register.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from 'react-bootstrap';
import FieldTextError from '../../components/FieldTextError/FieldTextError';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory()

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
        fetch(`http://localhost:5000/api/add_user`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(values),
        }).then(res => res.json())
        .then(data => console.log(data))
    }

    const changeLink = () => {
        history.push('/login')
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
                        <p className="text-center mb-0 mt-2">already have an account? <span className="suggestion_link" onClick={changeLink}>Login</span></p>
                    </div>
                </Form>
            </Formik>
        </Container>
    )
}

export default Register;