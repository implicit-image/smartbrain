import React from 'react'
import './FaceRecognition.css'
import { BoxCoords } from './../../types'

import FaceBox from '../FaceBox/FaceBox'

interface Props {
  url: string,
  boxes: Array<BoxCoords>
}

const FaceRecognition = ({ url, boxes }: Props) => {


  return (
    <div className='pa3 center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={url} alt="" style={{width: '500px', height: 'auto'}} />
        { boxes.length > 0 ?
            boxes.map((box: BoxCoords, i: number) =>
              <FaceBox box={box} key={i}/>)
          : <div></div>
        }

      </div>
    </div>
  )
}


export default FaceRecognition
