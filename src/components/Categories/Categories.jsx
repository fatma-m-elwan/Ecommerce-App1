import React, { useContext, useEffect , useState } from 'react'
import styles from "./Categories.module.css"
import axios from 'axios'
import Loader from '../loader/loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function Categories() {

  const {addToCart} = useContext(CartContext);
  
    async function addProductToCart (productId) {
        let response = await addToCart(productId)
        console.log(response);
        
    } 

    let {isFetching , isError , isLoading , data , error} = useQuery({
    queryKey : ["featureProduct"] ,
    queryFn : getProduct,
  })
  console.log(isFetching , isError , isLoading , data , error);
  
  function getProduct () {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  return (
    <>
        <div className='container mx-auto my-5'>
                  {isError ? <p>{error.message}</p> : null}
                  {isLoading ? <Loader/>
                  : <div className="flex flex-wrap gap-y-4 ">
                        {data?.data.data.map( (product) => 
                            <div key={product._id} className= 'product overflow-hidden hover:shadow-xl mx-auto sm:w-screen  md:w-1/4 lg:w-1/6'>
                              <div  className=" px-4 pb-4   ">
        
                                {/* <Link to={`/productdetails/${product.id}/${product.name}`}> */}
                                    <img src={product.image} className='w-[200px] h-[300px] ' alt="" />
                                    <h3 className='text-main text-sm font-semibold py-3'>{product.name}</h3>
                                    <p>{product.title}</p>
                                    
                                {/* </Link> */}
        
                                {/* <div className='mt-4'> 
                                  <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-full rounded-lg py-2'>See More</button>
                                </div> */}
                              </div>
                            </div>  
                        )}
                          
                    </div>
                  }
                    
                </div>
    </>
  )
}
