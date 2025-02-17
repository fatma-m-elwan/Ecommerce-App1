import React from 'react'
import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props) {

  if(localStorage.getItem("userContext")) {
      return props.children
  }
  else {
    return <Navigate to="/login"></Navigate>
  }

  
}
