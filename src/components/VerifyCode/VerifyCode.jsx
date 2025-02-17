import React, { useState } from 'react'
import styles from "./VerifyCode.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { TokenContext } from '../../Context/TokenContext';

export default function VerifyCode() {
  //  const [userMessage, setUserMessage] = useState(null)
  //   const [errorMessage, setErrerMessage] = useState(null) 

  let navigate = useNavigate()
  
        let schema = Yup.object({
            
              resetCode: Yup.string().required("Code is required").matches(/^[0-9]{1,10}$/i ,"Invalid Code"),
              
        })
  
        const formik = useFormik({
        
          initialValues : {
                resetCode:""
          },
          
          validationSchema : schema ,
      
          onSubmit : (values) => {
            console.log("hello" , values);
      
            loginForm(values)
          }
        }) 
        
        
         async function loginForm (values) {

      // setIsLoading(true)

      return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values).then( (data) => {
        console.log(data)
        // localStorage.setItem("userContext" , data.data.token)
        // setUserMessage(data.data.message)
        // setErrerMessage(null)
        // setIsLoading(false)
        navigate("/resetpassword")

      } ).catch( (err) =>  {
          console.log(err)
          // setErrerMessage(err.response.data.statusMsg)
          // setUserMessage(null)
          // setIsLoading(false)
      })
    
    }

  return (
    <>
      <div className='w-3/4 md:w-1/2 mx-auto'>
          
          {/* {userMessage ? 
            <div className="mt-6 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <p>{userMessage}</p>
            </div>
              : null
          }
          {errorMessage ? 
            <div className="mt-6 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <p>{errorMessage}</p>
            </div>
              : null
          } */}

          <form onSubmit={formik.handleSubmit}>
              
              <div className='my-2'>
                  <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please Enter Your Verification Code</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name='resetCode' type="text" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.resetCode && formik.errors.resetCode ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.resetCode}</p>
                    </div> : null
                  }
              </div>


              <div className='my-5'>
                
                {/* {isLoading ?  */}
                    {/* <button  className='bg-main text-white rounded-lg  px-4 py-2 '>
                      <i className='fa fa-spinner fa-spin'></i>
                    </button> */}
                     {/* : */}
                    <div>
                       <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='bg-main text-white rounded-lg  px-4 py-2 '>Verify</button>
                      {/* <Link  to="/forgetpassword" className=' ps-3 text-sm font-bold'>Forget Password ?</Link> */}
                    </div>   
                {/* } */}
                
              </div>
          </form>
        </div>
    </>
  )
}
