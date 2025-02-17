import React ,{useState} from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrerMessage] = useState(null) 
  const [isLoading, setIsLoading] = useState(false) 
  let navigate = useNavigate()

  // function validate(values) {

  //   const error = {} ;

  //   if(!values.name) {
  //     error.name = "Name is Required"
  //   }else if (values.name.length < 3) {
  //     error.name = "Must be mor than 3 characters "
  //   }
    
  //   if (!values.email) {
  //    error.email = 'Email is Required';
  //  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //    error.email = 'Invalid email address';
  //  }

  //  if(!values.password) {
  //   error.password = "Password is Required"
  //  }else if (!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)) {
  //   error.password = "Invalid Password"
  //  }

  //  if(!values.rePassword) {
  //   error.rePassword = "re-Password is Required"
  //  }else if (values.rePassword !== values.password) {
  //   error.rePassword = " Password not match"
  //  }

  //  if(!values.phone) {
  //   error.phone = "Phone is Required"
  //  }else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
  //   error.phone = "Invalid Phone"
  //  }

  //   return error;
  // }

  let schema = Yup.object({

      name: Yup.string().required("Name is required").min(3, "not less than 3 characters ").max(18 , "not large than 18 characters "),
      email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ,"Invalid email address"),
      password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,8}$/ , "Invalid Password"),
      rePassword: Yup.string().required("re-Password is required").oneOf([Yup.ref("password")] , "Password not match"),
      phone: Yup.string().required("Phone is required").matches(/^(002)?01[0125][0-9]{8}$/ , "Invalid Phone")
  })

  const formik = useFormik({
    initialValues : {
          name: "",
          email:"",
          password:"",
          rePassword:"",
          phone:""
    },
    // validate,

    validationSchema : schema ,

    onSubmit : (values) => {
      console.log("hello" , values);

      registerForm(values)
    }
  })

 async function registerForm (values) {

    setIsLoading(true)

    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values).then( (data) => {
      console.log(data.data)
      setUserMessage(data.data.message)
      setErrerMessage(null)
      setIsLoading(false)
      navigate("/login")

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
          <h1 className='text-main text-3xl'>Register Now:</h1>

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
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.name && formik.errors.name ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.name}</p>
                    </div> : null
                  }
              </div>
              
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

              <div className='my-2'>
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {formik.touched.rePassword && formik.errors.rePassword ? 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <p>{formik.errors.rePassword}</p>
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

              <div className='my-5'>
                
                {isLoading ? 
                   <button  className='bg-main text-white rounded-lg  px-4 py-2 '>
                      <i className='fa fa-spinner fa-spin'></i>
                   </button> :
                   <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='bg-main text-white rounded-lg  px-4 py-2 '>Register</button>
                }
               
              </div>
          </form>
        </div>
    </>
  )
}
