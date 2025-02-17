import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { useParams ,Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../loader/loader';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {

  const [productDetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [relatedProudects, setRelatedProudects] = useState([])

   const {addToCart} = useContext(CartContext);
  
    async function addProductToCart (productId) {
        let response = await addToCart(productId)
        console.log(response);
        
    } 


   var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true ,
    autoplaySpeed : 1500 ,
    arrows : false
  };


  let {id , category} = useParams ()
console.log(id ,category);



// function getProductDetails( ) {
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
// }

// let {data , isLoading , isError , error} = useQuery({
//   queryKey: ["productdetails"] ,
//   queryFn :getProductDetails
// })
// console.log(data);


async function getProductDetails () {
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then( (data)=> {
        // console.log(data)
        setProductDetails(data?.data.data)
        setIsLoading(false)
  }).catch( (error) => {
          console.log(error);
          setProductDetails(error.message)
          setIsLoading(false)
          setErrorMessage(error.message)
          
  })
}

async function getRealatedProduct () {
  return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then( (data) => {
      console.log(data.data.data );

      let relatedProudects = data.data.data 
      
      relatedProudects = relatedProudects.filter( (product) => product.category.name === category)

      console.log(relatedProudects);
      setRelatedProudects(relatedProudects)
      
      
  }).catch( (error) => {
      console.log(error);
      
  })
}

useEffect( () => {
  getProductDetails ()
  getRealatedProduct()
} , [])

useEffect( () => {
  getProductDetails ()
} , [id])

  return (
    <>
    

    {isLoading ? <Loader/> : 
      
      <div className="container m-auto">
        {errorMessage ? <p>{errorMessage}</p> : 
            <div className="flex gap-10 mb-8">
              <div className='w-1/4'>
                  <Slider {...settings}>
                    {productDetails?.images.map( (img , index) => 
                        <img key={index} className='mt-14 md:mt-0 ' src={img} alt="" />
                    )}
                  </Slider>
              </div>
              <div className='w-3/4 '>
                  <h2 className='pt-14  font-bold text-xl'>{productDetails.title}</h2>
                  <p className='py-4 text-gray-700 text-sm'>{productDetails.description}</p>
                  <h4 className=' md:pb-4 md:pt-4 text-gray-800 font-bold text-sm'>{productDetails.category?.name}</h4>
                  <div className="flex justify-between pt-1 ">
                    <div className='font-bold text-main'>{productDetails.price} EGP</div>
                    <div className=' mr-6'><i className="rating-color fa-solid fa-star"></i> {productDetails.ratingsAverage}</div>
                  </div>
                  <div className='mt-4 lg:my-10'> 
                    <button onClick={ () => addProductToCart(productDetails.id) } className='btn bg-main text-white w-full rounded-lg py-2'>AddTo Cart</button>
                  </div>
              </div>
            </div>
        }
      </div>
    } 

     <div className='container mx-auto my-5'>
              {isLoading ? <Loader/>
              : <div className="flex flex-wrap gap-y-4 ">
                    {relatedProudects.map( (product) => 
                        <div key={product.id} className= 'product overflow-hidden hover:shadow-xl mx-auto sm:w-screen  md:w-1/4 lg:w-1/6'>
                          <div  className=" px-4 pb-4   ">
    
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img src={product.imageCover} className='w-[200px] h-[300px] ' alt="" />
                                <h3 className='text-main text-sm font-semibold py-3'>{product.category.name}</h3>
                                <p>{product.title.split(" ").slice(0 , 2).join(" ")}</p>
                                <div className="flex justify-between pt-1 ">
                                  <div>{product.price} EGP</div>
                                  <div className=' mr-6'><i className="rating-color fa-solid fa-star"></i>{product.ratingsAverage}</div>
                                </div>
                            </Link>
    
                            <div className='mt-4'> 
                              <button onClick={ () => addProductToCart(product.id) }  className='btn bg-main text-white w-full rounded-lg py-2'>AddTo Cart</button>
                            </div>
                          </div>
                        </div>  
                    )}
                      
                </div>
              }
                
            </div> 
    </>
  )
}
