import React from 'react'
import { BoxCoords } from '../../types'
import '../FaceRecognition/FaceRecognition.css'

interface Props {
  box: BoxCoords
}


const FaceBox = ({ box }: Props) => {

  return (
    <div
      className='bounding-box'
      style={{
        top: box.top_row,
        right: box.right_column,
        bottom: box.bottom_row,
        left: box.left_column
      }}
    ></div>
  )
}



export default FaceBox
