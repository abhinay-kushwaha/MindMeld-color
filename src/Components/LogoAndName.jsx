import React from 'react'
import logo from "../assets/mindmeld.jpg"

const LogoAndName = () => {
  return (
    <div className='flex items-center gap-1'>
      <img 
    //   onError={(e) => (e.target.src = logo)}
       src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
       <h1 className='font-serif sm:text-xl text-nowrap'>MindMeld Color Picker </h1>
    </div>
  )
}

export default LogoAndName
