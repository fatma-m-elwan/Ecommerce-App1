import React from 'react'
import styles from "./Loader.module.css"
import { RotatingLines } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className=' h-screen flex justify-center items-center'>
        
          <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
    </div>
  )
}
