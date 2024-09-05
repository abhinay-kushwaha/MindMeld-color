import React from 'react'
import logo from "../../../assets/mindmeld.jpg"

const NameAndLogo = () => {
  return (
    <div className='flex items-center gap-1 sm:text-lg text-md p-1 sm:p-2'>
      <img src={logo} className='w-10 h-10 object-cover rounded-full' alt="mindmeld-logo" />
      <h1 className='font-bold font-serif'>MindMeld</h1>
    </div>
  )
}

export default NameAndLogo
