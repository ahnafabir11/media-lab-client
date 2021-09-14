import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from './App';

const VerifiedUser = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.verified ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/verify",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default VerifiedUser;