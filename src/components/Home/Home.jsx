import React from 'react'
import styles from "./Home.module.css"
import FeatueProudect from '../FeatueProudect/FeatueProudect'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'

export default function Home() {
  return (
    <>
    <MainSlider/>
    <CatSlider/>
    <FeatueProudect></FeatueProudect>
    </>
  )
}
