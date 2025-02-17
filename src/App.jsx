
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import Checkout from './components/Checkout/Checkout'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'

function App() {

  let router = createBrowserRouter([
    {path: "" , element: <Layout/> , children: [
      {index: true , element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path: "products" , element: <ProtectedRoutes><Products/></ProtectedRoutes>},
      {path: "brands" , element: <ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path: "cart" , element: <ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path: "cat" , element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path: "allorders" , element: <ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path: "checkout" , element: <ProtectedRoutes><Checkout/></ProtectedRoutes>},
      {path: "productdetails/:id/:category" , element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path: "login" , element: <ProtectedAuth><Login/></ProtectedAuth>},
      {path: "Ecommerce-App1/" , element: <ProtectedAuth><Login/></ProtectedAuth>},
      {path: "register" , element: <ProtectedAuth><Register/></ProtectedAuth> },
      {path: "forgetpassword" , element: <ProtectedAuth><ForgetPassword/></ProtectedAuth> },
      {path: "verifycode" , element: <ProtectedAuth><VerifyCode/></ProtectedAuth> },
      {path: "resetpassword" , element: <ProtectedAuth><ResetPassword/></ProtectedAuth> },

      {path: "*" , element: <NotFound/>},
    ]}
  ])

  
const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right"
          reverseOrder={false}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
    </>
  )
}

export default App
