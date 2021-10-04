import React, { MouseEvent, useEffect, useState } from 'react'
import './App.css'

//@ts-ignore
import Clarifai from 'clarifai'
import { BoxCoords, Route, User } from './types'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'


import Particles from 'react-tsparticles'
import particleOptions from './ParticleOptions'


const App = () => {



  const [route, setRoute] = useState(Route.SIGN_IN)

  const [imgUrl, setImgUrl] = useState('')

  const [modelId, setModelId] = useState('f76196b43bbd45c99b4f3cd8e8b40a8a')

  const [boxes, setBoxes] = useState([{
    bottom_row: 0,
    left_column: 0,
    right_column: 0,
    top_row: 0
  }] as Array<BoxCoords>)

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  } as User)

  const [isSignedIn, setIsSignedIn] = useState(false)

  const api_key ="df0af5a5ac054d45ad0e827befb9b91c"
    /* process.env.REACT_APP_CLARIFAI_API_KEY
                   */
  const app = new Clarifai.App({
    apiKey: api_key
  })

  const loadUser = (data: any) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    })
    setIsSignedIn(true)
  }



  const handleUrlSubmit = (event: MouseEvent<HTMLButtonElement>): void => {

    /*
       https://samples.clarifai.com/face-det.jpg
    */
    const url = (document.getElementById('url-input') as HTMLInputElement)!.value

    setImgUrl(url)

    app.models
       .predict(modelId, url)
       .then((response: any) => {

         if (response) {

           setBoxes(calculateBoxCoords(response))

           fetch(
             'http://localhost:3001/image',
             {
               method: 'put',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ id: user.id })
           })
         }
       })
       .then((response: any) => {
         if (response) {
           loadUser(response.user)
         }
       })
       .catch((err: Error) => {
         setBoxes([])
       })

    document.getElementById('inputImage')?.scrollIntoView({behavior: 'smooth'})
  }


  const handleSignOut = () => {
    setRoute(Route.SIGN_IN)
    setImgUrl("")
    setBoxes([])
    setIsSignedIn(false)
  }

  // BoxCoords represents calculated from BoundingBox values relative to img size
  const calculateBoxCoords = (response: any): BoxCoords[] => {

    const id = 'inputImage'
    const img = document.getElementById(id) as HTMLImageElement


    //if getting element fails img is null
    if  (img) {

      const width = img.width
      const height = img.height

      const regions = response.outputs[0].data.regions.map((r: any) => {
        const info = r.region_info.bounding_box
        return({
          bottom_row: height - (info.bottom_row * height),
          left_column: info.left_col * width,
          right_column: width - (info.right_col * width),
          top_row: info.top_row * height
        } as BoxCoords)

      })
      return regions
    } else {
      throw Error(`target id was: ${id}`)
    }
  }



  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={() => 0}
        loaded={() => 0}
        options={particleOptions}
      />

      <Navigation
        goSignIn={() => setRoute(Route.SIGN_IN)}
        goSignUp={() => setRoute(Route.SIGN_UP)}
        onSignOut={handleSignOut}
        isSignedUp={isSignedIn}
      />

      <Logo />
      {
        route === Route.SIGN_IN
        ?
          <SignIn
            goHome={() => setRoute(Route.HOME)}
            goSignUp={() => setRoute(Route.SIGN_UP)}
            loadUser={loadUser}
          />
        : route === Route.SIGN_UP
        ?
          <SignUp
            goHome={() => setRoute(Route.HOME)}
            goSignIn={() => setRoute(Route.SIGN_IN)}
            loadUser={loadUser}
          />
        :
          <>
            <Rank user={user}/>
            <ImageUrlForm
              onUrlSubmit={handleUrlSubmit}
            />
            {
              imgUrl.length !== 0
              ?
                <FaceRecognition
                  url={imgUrl}
                  boxes={boxes}
                />
              : <div></div>
            }
          </>
      }
    </div>
  )
}


export default App
