import './Login.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from 'react-bootstrap';
import FieldTextError from '../../components/FieldTextError/FieldTextError';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('enter valid email address').required('Email address required!'),
    password: Yup.string().min(6, "Password is wrong!").required('Password required!')
  })

  const onSubmit = (values) => {
    console.log('values', values);
  }

  const changeLink = () => {
    history.push('/register')
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
            <h1 className="text-center">LOGIN</h1>
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
            <p className="text-center mb-0 mt-2">don't have an account? <span className="suggestion_link" onClick={changeLink}>Register</span></p>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;