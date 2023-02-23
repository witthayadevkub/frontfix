import React, { useContext, useState } from "react"
// import { IoSettingsOutline } from "react-icons/io5"
// import { BsBagCheck } from "react-icons/bs"
// import { AiOutlineHeart } from "react-icons/ai"
// import { GrHelp } from "react-icons/gr"
// import { BiLogOut } from "react-icons/bi"
// import { RiImageAddLine } from "react-icons/ri"
import { Context } from "../../context/Context"
import { Link } from "react-router-dom"
import { Card } from "./Card"

export const User = () => {
  const { user, dispatch } = useContext(Context)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }

  const PublicFlo = "http://localhost:5000/images/"

  return (
    <>
     
      <div className='profile'>

      
      
        {user ? (
          <>
            <div className="fix">
            <Card/>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              {/* <img src={PublicFlo + user.profilePic} alt='' /> */}
              <i  class="material-symbols-outlined">menu</i>
              {/* <i class="material-symbols-outlined">account_circle</i> */}
            </button>
            </div>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                
                  <div className='image'>
                    <div className='iconuser'>
                       {/* <img src="https://scontent.fbkk3-3.fna.fbcdn.net/v/t1.15752-9/317287671_1288662368589365_8197305963989211889_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGZy4F-rxcHAXQtKoyg35UQ2CYnrrw_1zbYJieuvD_XNrZXHg6TZlJY-UZ18El5JOQ2PaqJSiQhGjRFuzsi9wpD&_nc_ohc=I04bvAmMPjUAX-mFfOP&_nc_ht=scontent.fbkk3-3.fna&oh=03_AdQ8pyLBR9tQUSZyS4hZ5Y1QZgVvCHXfRU5_w4Ou6JsP5g&oe=63F1F946" alt='' /> */}
                       <img src={PublicFlo + user.profilePic} alt='' />
                      {/* <i class="material-symbols-outlined">account_circle</i> */}
                    </div>
                    <div className='text'>
                      <h4>{user.username}</h4>
              
                    </div>
                  </div>
              

                <Link to='/create'>
                  <button className='box'>
                    {/* <RiImageAddLine className='icon' /> */}
                    <i class="material-symbols-outlined">add_circle</i>
                    <h4>Create Post</h4>
                  </button>
                </Link>

                <Link to='/createProduct'>
                  <button className='box'>
                  <i class="material-symbols-outlined">production_quantity_limits</i>
                    <h4>Create Produc</h4>
                  </button>
                </Link>
                
                <Link to='/shops'>
                  <button className='box'>
                    {/* <IoSettingsOutline className='icon' /> */}
                    <i class="material-symbols-outlined">storefront</i>
                    <h4>Shop</h4>
                  </button>
                </Link>

                <Link to='/account'>
                  <button className='box'>
                    {/* <IoSettingsOutline className='icon' /> */}
                    <i class="material-symbols-outlined">settings</i>
                    <h4>My Account</h4>
                  </button>
                </Link>
                {/* <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button>
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button> */}
                <button className='box' onClick={handleLogout}>
                  {/* <BiLogOut className='icon' /> */}
                  <i class="material-symbols-outlined">logout</i>
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button><i  class="material-symbols-outlined">menu</i></button>
          </Link>
        )}
      </div>
    </>
  )
}
