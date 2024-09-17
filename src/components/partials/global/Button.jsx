import { motion } from 'framer-motion'
import React from 'react'

const Button = ({ title }) => {

  return (
    <motion.div 
    whileHover={{ backgroundColor: "#c147e9" }}
    className='px-3 sm:px-5 py-2 w-fit text-lg sm:text-xl rounded-lg font-semibold white-black'>{title}</motion.div>
  )
}

export default Button