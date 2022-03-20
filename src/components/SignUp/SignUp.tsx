import react, { ChangeEvent, useState } from 'react'


import '../../global.css'


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

  const [authOK, setAuthOK] = useState(true)



  const handleCredChange = (event: ChangeEvent<HTMLInputElement>, credName: string) => {
    const temp: any = creds
    temp[`${credName}`] = event.target.value
    setCreds(temp)
  }

  const handleSubmitSignUp = () => {
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    })
    .then(res => {
      if (res.ok) { // should not pass if status is 400
        console.log(res)
        return res.json()
      } else {
        setAuthOK(false)
        throw new Error(JSON.stringify(res.body))
      }
    })
    .then(data => {
      loadUser(data)
      goHome()
    })
    .catch((err: Error) => {
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
                onChange={(e) => handleCredChange(e, 'email')}
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
                onChange={(e) => handleCredChange(e, 'name')}
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
                onChange={(e) => handleCredChange(e, 'password')}
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
