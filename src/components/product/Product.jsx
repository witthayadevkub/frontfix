import React from "react"
import { useEffect, useState} from "react"
// import { product } from "../../assets/data/data"
import "./product.css"
import { ProductCart } from "./ProductCart"
import axios from "axios"


export const Product = () => {
 const [DataProduct,setDataProduct] = useState([])

useEffect(()=>{
  axios.get('http://localhost:5000/products/')
  .then(res => setDataProduct(res.data))
  
  
},[])

// console.log(DataProduct)


  // return data;



  
  return (
    <>
      <section className='product'>
        <div className='container grid3'>
          {DataProduct.map((item,index) => (
            <ProductCart key={index}
            id={item._id} 
            cover={item.photo}
            store={item.store}
            name={item.title} 
            price={item.price} 
            user={item.username} 
            time ={item.updatedAt}
            sold = {item.sold}
            qty={item.qty}

            />
          ))}
        </div>
      </section>
    </>
  )
}
