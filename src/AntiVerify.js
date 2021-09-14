import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from './App';

const PrivateLogin = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !loggedInUser.verified ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateLogin;