import React, { useEffect } from 'react'
import styles from "./SpecificBrand.module.css"
import axios from 'axios'
import { data } from 'autoprefixer'

export default function SpecificBrand() {

  async function getSpecificBrand () {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands/64089ceb24b25627a2531596").then( (data) => {
      console.log(data);
      
    })
  }
  useEffect( () => {
    getSpecificBrand()
  } , [])
  return (
    <div>SpecificBrand</div>
  )
}
