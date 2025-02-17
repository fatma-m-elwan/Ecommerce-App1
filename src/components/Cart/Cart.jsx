import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
// import { Dropdown } from 'flowbite-react'

export default function Cart() {

  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let {getCart , removeCartItem ,updateProduct , clearCart , totalPrice} = useContext(CartContext)

   async function getAllCart () {
      let response = await getCart()
      console.log(response.data.data.products);
      setIsLoading(false)
      setCartItems(response.data.data.products)
    } 

  async function removeProduct (productId) {
    let response = await removeCartItem(productId)
    console.log(response.data.data.products);
    setCartItems(response.data.data.products)        
  } 

  async function updateCartProduct (productId , count) {
    let response = await updateProduct(productId ,count)
    console.log(response.data.data.products);
    setCartItems(response.data.data.products)        
  }

  async function clearAllCart () {
    let response = await clearCart()
    console.log(response.data.data.products);
    setCartItems([])        
  } 

  useEffect( () => {
    getAllCart()
  } ,[])

  return (
    <>





      {isLoading ? <Loader/> : <>
          <div className='text-end container mx-auto'>
            <button onClick={() => clearAllCart()} className='bg-red-600 text-white px-3 py-2 rounded-lg mb-5'>Clear Cart</button>
          </div>





          <div className="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map( (item) => <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateCartProduct(item.product.id , item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                     <span>{item.count}</span>
                    </div>
                    <button onClick={() => updateCartProduct(item.product.id , item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price * item.count} EGP
                </td>
                <td className="px-6 py-4">
                  <a onClick={() => removeProduct(item.product.id)} className="font-medium text-red-600 dark:text-red-500 cursor-pointer hover:underline hover:text-red-600">Remove</a>
                </td>
              </tr>)}
              <tr className= " text-center text-xl font-extrabold text-main bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className='py-4 text-main'>Total Price :</td>
                <td  className='py-4'>{totalPrice} EGP</td>


                <td colSpan={4}  className="text-end pe-3 ">

                  <Link className='bg-main text-white hover:text-white py-2 px-3 rounded-lg me-3 font-normal' to="/checkout" state={{type : "Online Payment"}} > Online</Link>
                  <Link className='bg-main text-white hover:text-white py-2 px-3  rounded-lg font-normal' to="/checkout" state={{type : "Cash On Delivery"}} > Cash</Link>

                    {/* <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Checkout<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                      </svg>
                    </button>


                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                          <Link to="/chackout" state={{type : "online Payment"}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online</Link>
                        </li>
                        <li>
                          <Link to="/chackout" state={{type : "Cash On Delivery"}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cash</Link>
                        </li>
                      </ul>
                    </div> */}
                </td>
                 
              </tr>
            </tbody>
          </table>


 




      </div>
      </>}
      


    </>
  )
}
