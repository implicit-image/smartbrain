import React, { ChangeEvent, useState } from 'react'

interface Props {
  goHome: () => void,
  goSignIn: () => void,
  loadUser: (u: any) => void,
}


const SignUp = ({ goHome, goSignIn, loadUser }: Props) => {

  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, name: event.target.value })
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, email: event.target.value })
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, password: event.target.value })
  }

  const handleSubmitSignUp = () => {
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        loadUser(data.user)
        goHome()
      } else {
        console.log("error signing up")
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
            <legend className="f2 fw6 ph0 mh0 center">Sign Up</legend>
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
             <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={handleNameChange}
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
              value="Sign up"
              onClick={handleSubmitSignUp}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db"
              onClick={goSignIn}
            >
              Sign in
            </a>
          </div>
        </div>
      </main>
    </article>
  )

}


export default SignUp
