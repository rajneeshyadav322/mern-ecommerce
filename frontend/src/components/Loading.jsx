import React from 'react'
import load from '../images/loading.gif'

const Loading = () => {
  return (
    <div className='flex items-center justify-center my-8'>
      <img src={load} alt="" />
    </div>
  )
}

export default Loading