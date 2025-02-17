import React, { useContext ,useEffect,useState } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const [paymentType, setPaymentType] = useState(null)
  let {onlinePayment , cashPayment} = useContext(CartContext)

  let {state} = useLocation()
  console.log(state.type);
  
  useEffect( () => {
    setPaymentType(state.type)
  } , [])

      const formik = useFormik({
  
          initialValues : {
                details: "",
                phone: "",
                city: ""
          },
      
          onSubmit : (values) => {
            console.log( values);
            payOnLine(values)
      
          }
      })

      async function payOnLine (values) {
        if(paymentType === "Online Payment") {
          await onlinePayment (values)
          console.log(" online ");
          
        } else { 
// (paymentType === "Cash On Delivery") 
          await cashPayment(values)
        } 

        
      }

     

  return (
      <>
        <div className="w-1/2 mx-auto">
            <h1 className='text-main text-2xl font-extrabold mb-8'>{paymentType}</h1>
            <form onSubmit={formik.handleSubmit}>
              
              <div className='my-2'>
                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name='details' type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.details && formik.errors.details ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.details}</p>
                    </div> : null
                  }
              </div>

              <div className='my-2'>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.phone && formik.errors.phone ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.phone}</p>
                    </div> : null
                  }
              </div>

              <div className='my-2'>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name='city' type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.city && formik.errors.city ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.city}</p>
                    </div> : null
                  }
              </div>

              <div className='my-5'>
                  <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='bg-main text-white rounded-lg  px-4 py-2 '>PayNow</button>
              </div>

          </form>
        </div>
      </>
  )
}
