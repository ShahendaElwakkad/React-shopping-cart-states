import React from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import "./styles.css";

const Home = () => {
    const {state: {products},
    productState:{sort,byStock,byFastDelivery,byRating,searchQuery}
}=CartState();
    
    const transformProducts=()=>{
        let SortedProducts=products;

        if(sort){
            SortedProducts=SortedProducts.sort((a,b)=>(
                sort==='lowToHigh' ? a.price-b.price : b.price-a.price
            ))
        }

        if (!byStock) {
            SortedProducts = SortedProducts.filter((prod) => prod.inStock);
        }


        if (byFastDelivery) {
            SortedProducts = SortedProducts.filter((prod) => prod.fastDelivery);
        }


        if (byRating) {
            SortedProducts = SortedProducts.filter(
              (prod) => prod.ratings >= byRating
            );
        }
      
          if (searchQuery) {
            SortedProducts = SortedProducts.filter((prod) =>
              prod.name.toLowerCase().includes(searchQuery)
            );
        }

        return SortedProducts;

    }

    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
            {transformProducts().map((prod)=>{
                return <SingleProduct prod={prod} key={prod.id}/>
            })
            }

            </div>
            
        </div>
    )
}

export default Home;
