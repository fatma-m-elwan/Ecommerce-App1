import React from 'react'
import styles from "./NotFound.module.css"
import Notfound from "./../../assets/404.jpg"

export default function NotFound() {
  return (
    <div className='container mx-auto'>
      <img src={Notfound} alt="notfound" className='w-full'/>
    </div>
  )
}
