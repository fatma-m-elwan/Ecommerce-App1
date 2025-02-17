import React from 'react'
import styles from "./MainSlider.module.css"
import slid1 from "./../../assets/slider-image-1.jpeg"
import slid2 from "./../../assets/slider-image-2.jpeg"
import slid3 from "./../../assets/slider-image-3.jpeg"
import slid4 from "./../../assets/slider-2.jpeg"
import slid5 from "./../../assets/grocery-banner.png"
import slid6 from "./../../assets/grocery-banner-2.jpeg"
import Slider from 'react-slick'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true ,
    autoplaySpeed : 2000 ,
    arrows : false
  };

  return (
    <>
        <div className="container mx-auto my-10">
            <div className="flex mx-auto">
                <div className="w-3/4">
                     <Slider {...settings}>
                          <img src= {slid3} className='h-[200px] md:h-[300px] ' alt="slid3" />
                          <img src= {slid4} className='h-[200px] md:h-[300px] ' alt="slid4" />
                          <img src= {slid5} className='h-[200px] md:h-[300px] ' alt="slid5" />
                          <img src= {slid6} className='h-[200px] md:h-[300px] ' alt="slid6" />
                     </Slider>
                </div>
                <div className="w-1/4">
                    <img src={slid1} className='h-[100px] md:h-[150px] w-screen ' alt="" />
                    <img src={slid2} className='h-[100px] md:h-[150px] w-screen ' alt="" />
                </div>

            </div>
        </div>
    </>
  )
}
