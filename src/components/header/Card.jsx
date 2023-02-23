import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { CartItems } from "./CartItems"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../../context/Context"
// import {useDispatch} from 'react-redux'
// import { cartActions } from "../../store/cartSlice"
import axios from "axios"
export const Card = () => {
  const { user } = useContext(Context)

 



  // const dispatch = useDispatch()
  const [cardOpen, setCardOpen] = useState(false)
  const closeCard = () => {
    setCardOpen(null)
  }


  // const [qty, setQty] = useState(0)
  
  const quantity = useSelector((state) => state.cart.totalQuantity)
  const cartItems = useSelector((state) => state.cart.itemsList)
  // console.log("Item "+ cartItems.map((item,idex) => idex + item.name ))
// console.log("LLL"+cartItems.map((item)=>item.id))
console.log("+",cartItems)

  let updateqty = cartItems.map((item)=>{
    return {
      updateOne:{
        filter:{ _id:item.id },
        update:{ $inc: { qty: - item.quantity,sold: + item.quantity} }
  
      }
    }
  })
  console.log(updateqty)
 
    const upqty = cartItems.map((item)=>{
    
    return{
      id: item.id,
      qty: item.qty-item.quantity,
      sold:  item.sold+item.quantity
      
    }     
      
  })



  
const addToOder = async () =>{
// console.log(updateqty.updateOne.update.$inc.qty)
  const newOder ={
    
    seller: cartItems.store,
    address: user.address,
    customer: user.username,
    alloder: cartItems,
    updateOne: updateqty

  }
  



  
  try {


    await axios.put(`/products/`,upqty)
    await axios.post("/orders", newOder)

    alert("add to order")

  } catch (error) {}
}



  //total
  let total = 0
  const itemsLists = useSelector((state) => state.cart.itemsList)
  itemsLists.forEach((item) => {
    total += item.totalPrice
  })

  return (
    <>
      <div className='card' onClick={() => setCardOpen(!cardOpen)}>
       
        <i class="material-symbols-outlined">local_mall</i>
        <span className='flexCenter'>{quantity}</span>
      </div>
      <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cardOpen ? "cartItem" : "cardhide"}>
        <div className='title flex'>
          <h2>Shopping</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className='icon' />
          </button>
        </div>
  
        
          {cartItems.map((item) => (
              <CartItems 
            id={item.id} 
            cover={item.cover} 
            name={item.name}
            user={item.username} 
            price={item.price} 
            quantity={item.quantity} 
            totalPrice={item.totalPrice}
            qty={item.qty} />
          
          ))}
    {total !== 0 ?   (
      <Link to ='/'>
      <div className='checkOut'>

      <h3>ราคารวมสินค้าทั้งหมด {total} บาท</h3>
         
       <h3  onClick={addToOder}>
       <span>กดเพื่อเพิ่มไปยัง Order ของคุณ</span> <i class="material-symbols-outlined">shopping_cart_checkout</i>
       </h3>

      </div>
     </Link>
    ):(
      <div>     
        <br />
        <br />
        <br />
          <h1>ไม่มีสินค้าใน Oder ของคุณ</h1>
      </div>
    )   
}

  
      </div>
    </>
  )
}
