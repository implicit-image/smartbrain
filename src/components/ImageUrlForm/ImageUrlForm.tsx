import React from 'react'
import './../../App.css'
import './ImageUrlForm.css'


const ImageUrlForm = () => {
  return (
    <div>
      <p className='f3'>
        {'This magic brain will detect faces in your pictures'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 form center'>
          <input className='f4 pa2 w-70 center' type='tex'/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageUrlForm