import React from 'react'
import './../../App.css'
import { User } from '../../types'

interface Props {
  user: User
}


const Rank = ( { user }: Props) => {
  return (
    <div>
      <div className='white f3'>
        {`${user.name}, your current score is`}
      </div>
      <div className='white f1'>
        {`#${user.entries}`}
      </div>
    </div>
  )
}

export default Rank
