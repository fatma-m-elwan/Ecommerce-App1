import React, { useEffect , useState } from 'react'
import styles from "./Brands.module.css"
import axios from 'axios'
import Loader from '../loader/loader'

export default function Brands() {
  const [allBrabds, setAllBrabds] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

 async function getAllBrands () {
    return  await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then( (data) => {
      console.log(data.data.data);
      setAllBrabds(data.data.data)
      setIsLoading(false)
      
    }).catch( (error) => {
        console.log(error.message);
        setErrorMessage(error.message)
        setIsLoading(false)

    }) 
  }

  useEffect( () => {
      getAllBrands()
  } , [])

  return (
    <>
      <div className='container mx-auto my-5'>
                {errorMessage ? <p>{errorMessage.message}</p> : null}
                {isLoading ? <Loader/>
                : <div className="flex flex-wrap gap-y-4 ">
                      {allBrabds.map( (brand) => 
                          <div key={brand._id} className= 'product overflow-hidden hover:shadow-xl mx-auto sm:w-screen  md:w-1/4 lg:w-1/6'>
                            <div  className=" px-4 pb-4   ">
      
                              {/* <Link to={`/productdetails/${product.id}/${product.category.name}`}> */}
                                  <img src={brand.image} className='' alt="" />
                                  <h3 className='text-main text-sm font-semibold py-3 px-5'>{brand.name}</h3>
                                  {/* <p>{product.title.split(" ").slice(0 , 2).join(" ")}</p>
                                  <div className="flex justify-between pt-1 ">
                                    <div>{product.price} EGP</div>
                                    <div className=' mr-6'><i className="rating-color fa-solid fa-star"></i>{product.ratingsAverage}</div>
                                  </div> */}
                              {/* </Link> */}
      
                              {/* <div className='mt-4'> 
                                <button className='btn bg-main text-white w-full rounded-lg py-2'>AddTo Cart</button>
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
