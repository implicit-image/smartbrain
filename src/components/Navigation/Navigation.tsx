import React from 'react'
import 'tachyons'

interface Props {
  goSignIn: () => void,
  goSignUp: () => void,
  onSignOut: () => void,
  isSignedUp: boolean
}

const Navigation = ({ goSignIn, goSignUp, onSignOut, isSignedUp }: Props) => {


  if (isSignedUp) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
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
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={goSignIn}
        >
          Sign in
        </p>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={goSignUp}
        >
          Sign up
        </p>
      </nav>
    )
  }
}

export default Navigation
