import React,{useState} from "react"

import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { cartActions } from "../../store/cartSlice"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
export const ProductCart = ({ id, cover, name, price, user, time, store, qty ,sold }) => {
  const { user:nameuser } = useContext(Context)
  const dispatch = useDispatch()
  const [cout, setCout] = useState(0)

  const addToCart = async () => {

    setCout((count) => count + 1)
    
    dispatch(cartActions.addToCart({ id, name, price, cover, store, user, qty,sold }))

  }

  

  
  const PublicFlo = "http://localhost:5000/images/"


  const Delete = async () => {
    try {
      await axios.delete(`/products/${id}`, { data: { username: user } })
      window.location.replace("/")
    } catch (error) {}
  }

  

  return (
    <>
      <div className='box boxItems' id='product'>
        
        <div className='img'>
          <Link to ={`/product/${id}`}>
            <img src={PublicFlo + cover} alt='' />
          </Link>
          
          <p>{new Date(time).toDateString()}</p>
        </div>
        
        <div className='details' key={id}>
        {/* <p>ชื่อร้านค้า  {store}</p> */}
        {sold>30?<p className="full"><span class="material-symbols-outlined">new_releases</span>สินค้าขายดี</p>:<p></p>}
          <h3>ชื่อสินค้า {name}</h3>
          <p>ราคา {price} บาท</p>
          <p>จำนวนสินค้าทีมี {qty-cout}</p>
         <p>ขายแล้ว {sold}</p>
          <p>ชื่อผู้ขาย {user}</p>
          
            <div className="star">
              {sold>=5?<p className="s"><span class="material-symbols-outlined">star</span></p>:<p className="n"><span class="material-symbols-outlined">star</span></p>}
              {sold>=10?<p className="s"><span class="material-symbols-outlined">star</span></p>:<p className="n"><span class="material-symbols-outlined">star</span></p>}
              {sold>=15?<p className="s"><span class="material-symbols-outlined">star</span></p>:<p className="n"><span class="material-symbols-outlined">star</span></p>}
              {sold>=20?<p className="s"><span class="material-symbols-outlined">star</span></p>:<p className="n"><span class="material-symbols-outlined">star</span></p>}
              {sold>=25?<p className="s"><span class="material-symbols-outlined">star</span></p>:<p className="n"><span class="material-symbols-outlined">star</span></p>}
            </div>
         

          {nameuser.username === user? (
            <div className="">
              <h3 className="Hi">สิ้นค้าของคุณ</h3> 
                <button className="DeleteProduct" onClick={Delete}>
                <p class="material-symbols-outlined">delete</p>
                </button> 
            </div>
          ) : (
          
           <div className="">
            {cout>=qty?(
              <h3 className="Hi">สินค้ามีจำกัด</h3>
            ):(
              <button  onClick={addToCart}>
               <i class="material-symbols-outlined">add_shopping_cart</i>
               </button>

              
            )}
            </div>
          )}
        
        
        </div>
      </div>
    </>
  )
}