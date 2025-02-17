import React, { useContext, useEffect , useState } from 'react'
import styles from "./FeatueProudect.module.css"
import axios from 'axios'
import Loader from '../loader/loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function FeatueProudect() {

  const {addToCart} = useContext(CartContext);

  async function addProductToCart (productId) {
      let response = await addToCart(productId)
      console.log(response);
      
  } 

  // const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true)


  // async function getProduct () {
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data) => {
  //       console.log(data.data.data)
  //       setProducts(data.data.data)
  //       setIsLoading(false)
  //   })
  //   .catch((error) => {
  //       console.log(error)
  //       setIsLoading(false)

  //   })
  // }

  // useEffect( ()=> {
  //   getProduct()
  // } , [])



  let {isFetching , isError , isLoading , data , error} = useQuery({
    queryKey : ["featureProduct"] ,
    queryFn : getProduct,
    // staleTime : 5000
    // retry : false
    // refetchInterval : 2000
  })
  console.log(isFetching , isError , isLoading , data , error);
  
  function getProduct () {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  return (
    <>
        <div className='container mx-auto my-5'>
          {isError ? <p>{error.message}</p> : null}
          {isLoading ? <Loader/>
          : <div className="flex flex-wrap gap-y-4 ">
                {data?.data.data.map( (product) => 
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
                          <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-full rounded-lg py-2'>AddTo Cart</button>
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
