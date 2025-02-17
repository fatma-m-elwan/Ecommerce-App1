import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider (props) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartId, setCartId] = useState(null)
    let headers ={
        token: localStorage.getItem("userContext")
    }

    async function addToCart (productId) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
            productId
        }, {
            headers
        }).then( (response) => {
            console.log(response.data);
            console.log(response.data.numOfCartItems);
            console.log(response.data.data.totalCartPrice);
            setCartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            toast.success(response.data.message)
            return response
            
        }).catch( (error) => {
            console.log(error);
            toast.error(error.message)
            return error
            
        })
    }

    async function getCart () {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,  {
            headers
        }).then( (response) => {
            console.log(response);
            setCartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error
            
        })
    }

    async function removeCartItem (productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,  {
            headers
        }).then( (response) => {
            console.log(response);
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error
            
        })
    }

    async function updateProduct (productId , count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
         {
            count 
        } , {
            headers
        }).then( (response) => {
            console.log(response);
            setCartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error
            
        })
    }

    async function clearCart () {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        } ).then( (response) => {
            console.log(response);
            setNumOfCartItems(0)
            setTotalPrice(0)
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error
            
        })
    }

    async function onlinePayment (shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,
         {
            shippingAddress 
        } , {
            headers
        }).then( (response) => {
            console.log(response.data.session.url);
             setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            window.location.href = response.data.session.url
           
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error
            
        })
    }

    async function cashPayment (shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,
         {
            shippingAddress 
        } , {
            headers
        }).then( (response) => {
            console.log(response);
             setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            window.location.href = "http://localhost:5173/allorders"
            
           
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error    
        })
    }
    async function allOrders () {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/` ).then( (response) => {
            console.log(response);
    
            return response
            
        }).catch( (error) => {
            console.log(error);
            return error    
        })
    }


    return <CartContext.Provider value={ {addToCart , getCart , onlinePayment , cashPayment , allOrders , removeCartItem ,updateProduct , clearCart , numOfCartItems , totalPrice} }>
        {props.children}
    </CartContext.Provider>
}