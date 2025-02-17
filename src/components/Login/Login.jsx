import React , {useContext, useState} from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {

  let {token, setToken} = useContext(TokenContext)
  
    console.log(token )

    const [userMessage, setUserMessage] = useState(null)
    const [errorMessage, setErrerMessage] = useState(null) 
    const [isLoading, setIsLoading] = useState(false) 
    let navigate = useNavigate()


     let schema = Yup.object({
    
          email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ,"Invalid email address"),
          password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,8}$/ , "Invalid Password"),
    })

    const formik = useFormik({

        initialValues : {
              email:"",
              password:"",
        },
        
        validationSchema : schema ,
    
        onSubmit : (values) => {
          console.log("hello" , values);
    
          loginForm(values)
        }
    })

    async function loginForm (values) {

      setIsLoading(true)

      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values).then( (data) => {
        console.log(data.data.token)
        localStorage.setItem("userContext" , data.data.token)
        setToken(data.data.token)

        setUserMessage(data.data.message)
        setErrerMessage(null)
        setIsLoading(false)
        navigate("/")

      } ).catch( (err) =>  {
          console.log(err.response.data.message)
          setErrerMessage(err.response.data.message)
          setUserMessage(null)
          setIsLoading(false)
      })
    
    }

  return (
     <>
        <div className='w-3/4 md:w-1/2 mx-auto'>
          <h1 className='text-main text-3xl'>Login Now:</h1>

          {userMessage ? 
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
          }

          <form onSubmit={formik.handleSubmit}>
              
              <div className='my-2'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.email && formik.errors.email ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.email}</p>
                    </div> : null
                  }
              </div>

              <div className='my-2'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.password && formik.errors.password ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.password}</p>
                    </div> : null
                  }
              </div>

              <div className='my-5'>
                
                {isLoading ? 
                   <button  className='bg-main text-white rounded-lg  px-4 py-2 '>
                      <i className='fa fa-spinner fa-spin'></i>
                   </button> :
                   <div>
                      <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='bg-main text-white rounded-lg  px-4 py-2 '>Login</button>
                      <Link  to="/forgetpassword" className=' ps-3 text-sm font-bold'>Forget Password ?</Link>
                   </div>   
                }
               
              </div>
          </form>
        </div>
    </>
  )
}
