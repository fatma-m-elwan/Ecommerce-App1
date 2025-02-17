import React, { useContext, useEffect, useState } from 'react'
import styles from "./AllOrders.module.css"
import { CartContext } from '../../Context/CartContext'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'

export default function AllOrders() {

  // const [orders, setOrders] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // let {allOrders} = useContext(CartContext)

  // async function getAllOrders () {
  //   let response =  await allOrders()
  //   console.log(response.data.data);
  //   setOrders(response.data.data)
  //   setIsLoading(false)
    
  // }

  // useEffect( () => {
  //   getAllOrders()
  // } , [])
  return (
    <>
<h1 className='text-main text-5xl font-extrabold py-3 text-center py-20'>Congratoltion</h1>
        {/* <div className='container mx-auto my-5'>
                  
                  {isLoading ? <Loader/>
                  : <div className="flex flex-wrap gap-y-4 ">
                        {orders.map( (order) => 
                            <div key={order._id} className= 'product overflow-hidden hover:shadow-xl mx-auto sm:w-screen  md:w-1/4 lg:w-1/6'>
                              <div  className=" px-4 pb-4   ">
        
                                {/* <Link to={`/productdetails/${product.id}/${product.category.name}`}> */}
                                    {/* <img src={order.cartItems.map((item) => item.product.imageCover)} className='w-[200px] h-[300px] ' alt=""/> 
                                    <h3 className='text-main text-sm font-semibold py-3'>{order.cartItems.map((item) => item.product.title.split(" ").slice(0 , 2).join(" "))}</h3>
                                    <h3 className='text-main text-sm font-semibold py-3'>{order.cartItems.map((item) => item.price)}</h3>
                                    <h3 className='text-main text-sm font-semibold py-3'>{order.cartItems.map((item) => item.count)}</h3> */}
                                    {/* <p>{product.title.split(" ").slice(0 , 2).join(" ")}</p> */}
                                    {/* <div className="flex justify-between pt-1 ">
                                      <div>{product.price} EGP</div>
                                      <div className=' mr-6'><i className="rating-color fa-solid fa-star"></i>{product.ratingsAverage}</div>
                                    </div> */}
                                {/* </Link> */}
        
                                {/* <div className='mt-4'> 
                                  <button className='btn bg-main text-white w-full rounded-lg py-2'>AddTo Cart</button>
                                </div> */}
                              {/* </div> */}
                            {/* </div>   */}
                        {/* )} */}
                          
                    {/* </div> */}
                  {/* } */}
                    
                {/* </div> */} 
                {/* } */}
    </>
  )
}
