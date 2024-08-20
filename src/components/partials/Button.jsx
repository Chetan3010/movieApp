import React from 'react'

const Button = ({ title }) => {
  return (
    <div className='px-3 sm:px-5 py-2 primary secondary w-fit text-lg sm:text-xl rounded-lg font-semibold hover:bg-[#ca38fb]'>{title}</div>
  )
}

export default Button