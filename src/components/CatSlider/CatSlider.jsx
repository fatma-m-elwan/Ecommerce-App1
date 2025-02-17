import React from 'react'
import styles from "./CatSlider.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick';

export default function CatSlider() {

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay : true ,
    autoplaySpeed : 2000 ,
    arrows : false
  };

  function getCatSlider () {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let {data} = useQuery ({
    queryKey: ["catslider"] ,
    queryFn : getCatSlider 
  })
console.log(data?.data.data);

  return (
    <>
      <div className="container mx-auto my-12">
            {/* <div className="flex"> */}
              <Slider {...settings}>
                  {data?.data?.data.map( (image) => <>
                       <img className='h-[100px] md:h-[150px] lg:h-[200px] md:pb-4' key={image._id} src={image.image} alt="" />
                      <p className='text-center'>{image.name}</p>
                  </>
                     
                  )}
              </Slider>
            {/* </div> */}
      </div>
    </>
  )
}
