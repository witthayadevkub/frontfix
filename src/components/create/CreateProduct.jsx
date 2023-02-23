import React from "react"
import "./create.css"

import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"


export const CreateProduct = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  // const [store, setStore] = useState("")
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState()
  const [qty, setQty] = useState()
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username,
      title,
      price,
      desc,
      file,
      qty,
      store: user.username
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("/products", newPost)
      window.location.replace("/product/" + res.data._id)
    } catch (error) {}
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
        <h1>Create Product</h1>
        <br />
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                  <i class="material-symbols-outlined">add_photo_alternate</i> 
                  <h6>add picture</h6>
              </label>
              <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <br />
            {/* <h3>ตั้งชื่อร้านค้าของคุณ</h3>
            <input type='text' placeholder='Name Your Product' onChange={(e) => setStore(e.target.value)} /> */}
            <h3>ชื่อสินค้า</h3>
            <input type='text' placeholder='Name Your Product' onChange={(e) => setTitle(e.target.value)} />

            <h3>ราคาสินค้า</h3>
            <input type='number' placeholder='Price Your Product' onChange={(e) => setPrice(e.target.value)} />

            <h3>จำนวนสินค้า</h3>
            <input type='number' placeholder='qty Your Product' onChange={(e) => setQty(e.target.value)} />

            <h3>รายละเอียดสินค้า</h3>
            <textarea name='' id='' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            
            <button className='btn'>Create Product</button>
          </form>
        </div>
      </section>
    </>
  )
}
