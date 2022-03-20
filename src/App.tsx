import react, { MouseEvent, useState } from 'react'
import './App.css'

//@ts-ignore
import { BoxCoords, Route, User } from './types'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Main from './components/Main/Main'

import Particles from 'react-tsparticles'
import particleOptions from './ParticleOptions'


const App = () => {


  const [route, setRoute] = useState(Route.SIGN_IN)

  const [imgUrl, setImgUrl] = useState('')

  const [modelId, setModelId] = useState('f76196b43bbd45c99b4f3cd8e8b40a8a')

  const [boxes, setBoxes] = useState([] as Array<BoxCoords>)

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } as User)


  const [isSignedIn, setIsSignedIn] = useState(false)
  const [serverUrl, setServerUrl] = useState("http://localhost:3001")


  const loadUser = (user: User) => {
    setUser(user)
    if (!isSignedIn)
      setIsSignedIn(true)
  }

  const handleUrlSubmit = (event: MouseEvent<HTMLButtonElement>): void => {

    /*
       https://samples.clarifai.com/face-det.jpg
    */
    const url = (document.getElementById('url-input') as HTMLInputElement)!.value

    setImgUrl(url)

    fetch(
      `${serverUrl}/image`,
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, url: url, modelId: modelId })
      })
    .then((data: any) => {
      if (data.ok) {
        return data.json()
      } else {
        throw new Error(`ERROR GETTING IMAGE DATA BACK: \n ${data}` )
      }
    })
    .then(data => {
        console.log(data)
        setBoxes(calculateBoxCoords(data.response))
        setUser(data.user)
        document.getElementById('inputImage')?.scrollIntoView({behavior: 'smooth'})
    })
    .catch((err: Error) => {
      console.log(err)
    })
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
      // shortcuts for convienience
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
      // temporary, TODO handle incorrect image id
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
        route={route}
      />

      <Logo />

      <Main
        route={route}
        setRoute={setRoute}
        loadUser={loadUser}
        handleUrlSubmit={handleUrlSubmit}
        url={imgUrl}
        boxes={boxes}
        user={user}
        serverUrl={serverUrl}
      />
    </div>
  )
}


export default App



