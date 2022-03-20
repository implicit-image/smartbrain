import React, { ChangeEvent, useState } from 'react'

import '../../global.css'


interface Props {
  goHome: () => void,
  goSignUp: () => void,
  loadUser: (u: any) => void
}

const SignIn = ({ goHome, goSignUp, loadUser }: Props) => {

  const [authOK, setAuthOK] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmitSignIn = (event: any) => {
    fetch("http://localhost:3001/signin", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        //TODO auth color inicaator
        setAuthOK(false)
        throw new Error('error signing in')
      }
    })
    .then(user => {
      loadUser(user)
      goHome()
    })
    .catch((err: Error) => {
      console.log("error signing in:\n", err)

      const erroredFields = document.getElementsByTagName('input')
      for (let i = 0; i <= erroredFields.length; i = i + 1) {
        if (erroredFields.item(i)?.type != 'submit')
          erroredFields.item(i)?.classList.add('error')
      }

    })
  }

  return (
    <article
      className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
    >
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={handleEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={handleSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db"
              onClick={goSignUp}
            >
              Sign up
            </a>
          </div>
        </div>
      </main>
    </article>
  )

}

export default SignIn
