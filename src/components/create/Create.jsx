import React from "react"
import "./create.css"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
// import { useLocation } from "react-router-dom"

export const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  // const [price, setPrice] = useState(0)

  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username,
      title,
      desc,
      file,
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
      const res = await axios.post("/posts", newPost)
      window.location.replace("/post/" + res.data._id)
    } catch (error) {}
  }

  return (
    <>
      <section className='newPost'>
  
        <div className='container boxItems'>
        <h1>Create Post</h1>
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
            <h3>หัวข้อหรือความคิดเห็น</h3>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            
            <h3>รายละเอียด</h3>
            <textarea name='' id='' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button className='btn'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )
}
