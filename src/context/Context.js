import React, { createContext, useContext, useReducer } from 'react';
import faker from 'faker';
import { cartReducer, productReducer } from './Reducers';

const Cart=createContext();
faker.seed(99); //hy5ali el data static, bdl ma kol mara arefresh el page ygebli data gdida.

const Context = ({children}) => {
    //create fake products
    const products=[...Array(20)].map(()=>({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        image:faker.random.image(),
        inStock:faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery:faker.datatype.boolean(),
        ratings:faker.random.arrayElement([1,2,3,4,5])
    }))

    //3mlt create l useReducer 3shan t-handle el complex states bdl el usetState
    //3mlt initialState= el products bt3ty wl cart=[] 3shan hatkon fadya f awl state leha abl ma a3ml addToCart.

    const [state, dispatch] = useReducer(cartReducer, {
        products:products,
        cart:[]
    })


    const [productState, productDispatch] = useReducer(productReducer, {
        byStock:false,
        byFastDelivery:false,
        byRating:0,
        searchQuery:""
    })

    return (
        <Cart.Provider value={{state,dispatch,productState, productDispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default Context;

export const CartState=()=>{
    return useContext(Cart);

}
