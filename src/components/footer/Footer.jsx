import React from "react"

import "./Footer.css"
export const Footer = () => {
  return (
    <>
      <footer className='boxItems'>
        <div className='container flex'>
          <p>Witthaya Faengsap</p>
          <div className='social'>
            <div class="social-icons">
                <p>ติดต่อเราได้ที่</p>
              <a href="https://www.facebook.com/profile.php?id=100011095541596"  title="facebook"> 
                <i class="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100011095541596" title="instagram">  
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100011095541596" title="youtube">
                <i class="fa fa-youtube-square" aria-hidden="true"></i>
              </a>
            </div> 
          </div>
        </div>
      </footer>
    </>
  )
}


