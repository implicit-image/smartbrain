import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import Img from './Logo.png'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt br2 shadow-2'
        tiltReverse={true}
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
      >
        <div className='Tilt-inner'>
          <img src={Img} className='logo' alt='logo' />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
