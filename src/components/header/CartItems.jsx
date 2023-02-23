import React from "react"
import { useDispatch } from "react-redux"

import { cartActions } from "../../store/cartSlice"

export const CartItems = ({ id, cover, name, price, quantity, totalPrice,  qty}) => {
  const dispatch = useDispatch()

  const incCartitems = () => {
    dispatch(cartActions.addToCart({ id, name, price, }))
  }
  const descCartitems = () => {
    dispatch(cartActions.removeFromCart(id))
  }
  const PublicFlo = "http://localhost:5000/images/"






  return (
    <>

      <div className='cardList'>
        <div className='cartContent'>
          <div className='img'>
          <img src={PublicFlo + cover} alt='cover' />
          </div>
          <div className='details'>
            <p>ชื่อสินค้า {name}</p>
            <p htmlFor=''>ราคา {price} บาท</p>
            <p className='priceTitle'> ราคารวมสินค้านี้ {totalPrice}</p>
            <div className='price'>
             

              <div className="qtybtn">
              {quantity >= qty? (
              <div className="container grid3">
                <span>สูงสุด:</span>
                <h3>{quantity > qty ? quantity=qty:quantity}</h3>
                 {/* <h3>{quantity}</h3>  */}
                 <span class="material-symbols-outlined" onClick={descCartitems} >do_not_disturb_on</span>
              </div>
              ):( 
                <div className="container grid3">
                  <span class="material-symbols-outlined" onClick={incCartitems} >add_circle</span>
                  <h3>{quantity}</h3>
                  <span class="material-symbols-outlined" onClick={descCartitems} >do_not_disturb_on</span>
                </div>
              )}

               
              </div>

              

            </div>
          </div>
        </div>
      </div>
    </>
  )
}