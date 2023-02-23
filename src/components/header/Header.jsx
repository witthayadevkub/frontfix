import React from "react"
import logo from "../../assets/images/logo.png"
import "./header.css"
import { User } from "./User"
// import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"
// import { Card } from "./Card"

export const Header = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          
          <Link to='/'>
            <div className ='logo'>
              <img src={logo} alt='logo' width='50px' />
              <h1>Tree<span>fix</span></h1>
            </div>
          </Link>
       
          <nav>
            <ul>
              
                <li className="menulogo">
                  <Link to="/">
                    <i class="material-symbols-outlined">home</i>
                  </Link>
                </li>
 
                <li className="menulogo">
                  <Link to="/shops">
                    <i class="material-symbols-outlined">storefront</i>
                  </Link>
                </li>

                <li className="menulogo">
                  <Link to="/orders">
                    <i class="material-symbols-outlined">folder_shared</i>
                  </Link>
                </li>
                
            </ul>
          </nav>
          <div className='account flexCenter'>
            {/* <Card /> */}
            <User />
          </div>
        </div>
      </header>
    </>
  )
}
