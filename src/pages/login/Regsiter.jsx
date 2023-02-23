import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import img from "../../assets/images/tree.jpg"
export const Regsiter = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        address,
      })
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
          <img src={img} alt='' />
            <div className='text'>
              <h3>Register</h3>
              <h1>My account</h1>
              <p>สมัครสมาชิกของเรา</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username *</span>
            <p>Username ไม่สามารถซ้ำได้</p>
            <input type='text' required onChange={(e) => setUsername(e.target.value)} />
            <span>Email *</span>
            <p>Email ไม่สามารถซ้ำได้</p>
            <input type='email' required onChange={(e) => setEmail(e.target.value)} />
            <span>Password *</span>
            <p>ตั้งรหัสผ่าน</p>
            <input type='password' required onChange={(e) => setPassword(e.target.value)} />
            <span>Address *</span>
            <p>บ้านเลขที่/ชื่อหมู่บ้าน/ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์</p>
            <p style={{color:"red"}}>*ข้อมูลนี้จำเป็นในการจัดส่งสินค้า</p>
            <input type='address' required onChange={(e) => setAddress(e.target.value)} />
            <button type='submit' className='button'>
              Register
            </button>
          </form>
          {error && <span className="showerror">Someting went wrong !!!  มีอะไรบางอย่างที่ผิดพลาด</span>}
        
        </div>
      </section>
    </>
  )
}
