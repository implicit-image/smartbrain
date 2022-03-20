import React from 'react'
import 'tachyons'
import '../../App.css'

import { Route } from '../../types'


interface Props {
  goSignIn: () => void,
  goSignUp: () => void,
  onSignOut: () => void,
  isSignedUp: boolean,
  route: Route
}

const Navigation = ({ goSignIn, goSignUp, onSignOut, isSignedUp, route }: Props) => {


  if (isSignedUp) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        className='test'
      >
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onSignOut()}
        >
          Sign out
        </p>
      </nav>
    )
  }
  else {
    return (
      <nav
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        { route == Route.SIGN_UP
          ?
          <p
            className='f3 link dim black underline pa3 pointer'
            onClick={goSignIn}
          >
            Sign in
          </p>
          :
          <p
            className='f3 link dim black underline pa3 pointer'
            onClick={goSignUp}
          >
            Sign up
          </p>
        }
      </nav>
    )
  }
}

export default Navigation
