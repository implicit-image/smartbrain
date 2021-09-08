import React, { MouseEvent, useEffect, useState } from 'react'
import './App.css'

//@ts-ignore
import Clarifai from 'clarifai'
import { BoundingBox, BoxCoords, Route, User } from './types'

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

  const api_key ='df0af5a5ac054d45ad0e827befb9b91c'

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
       .then((res: any) => {
         setBoxes(
           res.outputs[0].data.regions
              .map((r: any) =>
                calculateBoxPosition(r.region_info.bounding_box)))
       })
       .catch((err: Error) => {
         setBoxes([])
       })

    document.getElementById('inputImage')?.scrollIntoView({behavior: 'smooth'})
  }

  // BoundingBox represents type of an object im interested in extracting from
  // the response.
  // BoxCoords represents calculated from BoundingBox values relative to img size
  const calculateBoxPosition = (positions: BoundingBox): BoxCoords => {

    const id='inputImage'
    const img = document.getElementById(id) as HTMLImageElement

    //if getting element fails img is null
    if  (img) {
      const width = img.width
      const height = img.height

      return({
        bottom_row: height - (positions.bottom_row * height),
        left_column: positions.left_col * width,
        right_column: width - (positions.right_col * width),
        top_row: positions.top_row * height
      } as BoxCoords)

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
        isSignedUp={isSignedIn}
      />

      <Logo />
      {
        route === Route.SIGN_IN
        ? <SignIn
            goHome={() => setRoute(Route.HOME)}
            goSignUp={() => setRoute(Route.SIGN_UP)}
            loadUser={loadUser}/>
        : route === Route.SIGN_UP
        ? <SignUp
            goHome={() => setRoute(Route.HOME)}
            goSignIn={() => setRoute(Route.SIGN_IN)}
            loadUser={loadUser}/>
        :
        <>
          <Rank user={user}/>
          <ImageUrlForm
            onUrlSubmit={handleUrlSubmit}
          />
          {
            imgUrl.length !== 0 ?
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
