import react, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Route, BoxCoords, User } from '../../types'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import Rank from '../Rank/Rank'
import ImageUrlForm from '../ImageUrlForm/ImageUrlForm'
import FaceRecognition from '../FaceRecognition/FaceRecognition'




interface Props {
  route: Route,
  setRoute: Dispatch<SetStateAction<Route>>,
  loadUser: (u: any) => void,
  handleUrlSubmit: (u: MouseEvent<HTMLButtonElement>) => void,
  url: string,
  boxes: Array<BoxCoords>,
  user: User,
  serverUrl: string
}

const Main = ({ route, setRoute, loadUser, handleUrlSubmit, url, boxes, user, serverUrl }: Props) => {
  if (route === Route.SIGN_IN) {
    return(
      <SignIn
        goHome={() => setRoute(Route.HOME)}
        goSignUp={() => setRoute(Route.SIGN_UP)}
        loadUser={loadUser}
        serverUrl={serverUrl}
      />
    )
  }
  else if (route === Route.SIGN_UP) {
    return(
      <SignUp
        goHome={() => setRoute(Route.HOME)}
        goSignIn={() => setRoute(Route.SIGN_IN)}
        loadUser={loadUser}
        serverUrl={serverUrl}
      />
    )
  }
  else if (route === Route.HOME) {
    return(
      <>
        <Rank user={user}/>
        <ImageUrlForm
          onUrlSubmit={handleUrlSubmit}
        />
        <FaceRecognition
          url={url}
          boxes={boxes}
        />
      </>
    )
  }
  else {
    return(
      <div></div>
    )
  }
}

export default Main
