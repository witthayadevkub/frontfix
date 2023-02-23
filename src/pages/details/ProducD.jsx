import React, { useContext, useEffect, useState } from "react"
import "./details.css"
import "../../components/header/header.css"

import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { Context } from "../../context/Context"

export const ProducD = () => {
  const location = useLocation()
  // console.log(location)
  const path = location.pathname.split("/")[2]

  // step 4 for update
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)
  const [name, setName] = useState("")
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
//   const [file, setFile] = useState(null)

  //setp 2
  const [post, setPost] = useState({})
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/products/" + path)
      // console.log(res)
      //setp 2
      setPost(res.data)
      //setp 4
      setQty(res.data.qty)
      setName(res.data.title)
      setDesc(res.data.desc)
      setPrice(res.data.price)
    }
    getPost()
  }, [path])

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    
    const [orders, setOrders] = useState([])
    // const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([])
    useEffect(()=>{
        axios.get('/orders/')
        .then(res => {
            setOrders(res.data) 
            setFilter(res.data)
        })
        
       
      },[])

      function handleFilter() {
        const filtered = filter.filter(event => event.updatedAt >= startDate && event.updatedAt <= endDate);
        // const filterResult = events.filter(event => event.updatedAt >= startDate && event.updatedAt <= endDate)
        
        setFilteredEvents(filtered);
      }
      
      // const filterDate = (e) => {
      //   if(e.target.value === ""){
      //       setOrders(filter)
      // }else{

      //   const filterResult = filter.filter(item => item.updatedAt.toLowerCase().includes(e.target.value.toLowerCase()) || item.customer.toLowerCase().includes(e.target.value.toLowerCase()))
      //   if(filterResult.length > 0){
      //       setOrders(filterResult)
      //   }else{
      //       setOrders([])
      //   }
        
      // }
      // setSearch(e.target.value)
      // }
    
  // step 3
  // file create garne time add garne
  const PublicFlo = "http://localhost:5000/images/"
  const { user } = useContext(Context)

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${post._id}`, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) {}
  }

  // setp 4
  const handleUpdate = async () => {
    try {
      await axios.put(`/products/${post._id}`, { username: user.username, name ,price, desc, qty })
      window.location.reload()
    } catch (error) {}
  }
  const filteralltotalPrice = filteredEvents.map((order)=>order.alloder.filter(item => item.name === name ).map(item => item.totalPrice).reduce((acc, price) => acc + price, 0)).reduce((acc, price) => acc + price, 0);
  const filterallquantity = filteredEvents.map((order)=>order.alloder.filter(item => item.name === name ).map(item => item.quantity).reduce((acc, price) => acc + price, 0)).reduce((acc, price) => acc + price, 0);
  const filterall = filteralltotalPrice*7/100

  const alltotalPrice = orders.map((order)=>order.alloder.filter(item => item.name === name ).map(item => item.totalPrice).reduce((acc, price) => acc + price, 0)).reduce((acc, price) => acc + price, 0);
  const allquantity = orders.map((order)=>order.alloder.filter(item => item.name === name ).map(item => item.quantity).reduce((acc, price) => acc + price, 0)).reduce((acc, price) => acc + price, 0);
  const all = alltotalPrice*7/100


  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='left'>{post.photo && <img src={PublicFlo + post.photo} alt='' />}</div>
          <div className='right'>
            {post.username === user?.username && (
              <div className='buttons'>
                <button className='button' onClick={() => setUpdate(true)}>
                  <BsPencilSquare />
                </button>
                <button className='button' onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
                
                {update && (
                  <button className='button' onClick={handleUpdate}>
                    Update
                  </button>
                )}
              </div>
            )}
      
            {update ? <input type='text' value={name} className='updateInput' onChange={(e) => setName(e.target.value)} /> : <h1>ชื่อสินค้า : {post.title}</h1>}
            {update ? <input type='number' min="1" value={qty} className='updateInput' onChange={(e) => setQty(e.target.value)} /> : <h1>จำนวนสินค้าที่มี : {post.qty} ชิ้น</h1>}
            {update ? <input type='number' min="100" value={price} className='updateInput' onChange={(e) => setPrice(e.target.value)} /> : <h1>ราคา : {post.price} บาท</h1>}
            {update ? <textarea value={desc} cols='30' rows='10' className='updateInput' onChange={(e) => setDesc(e.target.value)}></textarea> : <p>{post.desc}</p>}

            <p>
              ชื่อผู้ขาย: <Link to={`/?user=${post.username}`}>{post.username}</Link>
            </p>
            <br />

            {post.username === user?.username ?(
              <div>
                {/* <p>
                  ยอดขายรวมทั้งหมด จาก Order: {post.sold} ชิ้น ยอด {post.price*post.sold} บาท
                </p>
                <p>
                  ภาษีที่ต้องจ่าย 7% จากยอดการสั่งซื้อ: {(post.price*post.sold)*7/100} บาท
                </p> */}

<div className="check">

<table>
        <tr>
          <th>ยอดขายรวมทั้งหมด จาก Order</th>
          <th>ยอดขายรวมทั้งหมด จาก Order</th>
          <th>ภาษีที่ต้องจ่าย 7% จากยอดการสั่งซื้อ</th>         
        </tr>

        <tr>
          <td>{alltotalPrice.toLocaleString('en-US')}</td>
          <td>{allquantity.toLocaleString('en-US')}</td>
          <td>{all.toLocaleString('en-US')}</td>      
        </tr>
</table>

<p>ยอดขายรวมทั้งหมด จาก Order : {alltotalPrice.toLocaleString('en-US')} บาท</p>
<p>ยอดขายรวมทั้งหมด จาก Order : {allquantity.toLocaleString('en-US')} ชิ้น </p>
<p>ภาษีที่ต้องจ่าย 7% จากยอดการสั่งซื้อ : {all.toLocaleString('en-US')} บาท</p>
{/* ดูยอดจากวันที่สั่ง order :  <input type='date'  value={search} onInput={(e)=>filterDate(e)}/> */}

</div>

               
                <div className='container'>
                  <br />
                  <br />

                    <div className="check">

                    <table>
                            <tr>
                              <th>ยอดขายรวมทั้งหมด จาก Order</th>
                              <th>ยอดขายรวมทั้งหมด จาก Order</th>
                              <th>ภาษีที่ต้องจ่าย 7% จากยอดการสั่งซื้อ</th>         
                            </tr>

                            <tr>
                              <td>{filteralltotalPrice.toLocaleString('en-US')}</td>
                              <td>{filterallquantity.toLocaleString('en-US')}</td>
                              <td>{filterall.toLocaleString('en-US')}</td>      
                            </tr>
                    </table>

                    <p>ยอดขายรวมทั้งหมด จาก Order : {filteralltotalPrice.toLocaleString('en-US')} บาท</p>
                    <p>ยอดขายรวมทั้งหมด จาก Order : {filterallquantity.toLocaleString('en-US')} ชิ้น </p>
                    <p>ภาษีที่ต้องจ่าย 7% จากยอดการสั่งซื้อ : {filterall.toLocaleString('en-US')} บาท</p>

                    <div className="datefrom">
                      <center>
                        <h6>ค้นหาจากระยะเวลา</h6>
                        <p> Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></p>
                        <p> End Date: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></p>
                        <button onClick={handleFilter}>Filter</button>
                      </center>
                    </div>
                    
                    </div>
              
<br />
<br />                         

              {filteredEvents.map((order) => (                   
                      <div >                  
                  {order.alloder.filter((item) => item.name === name).map((item, index) => (
                        <div key={index}>
                          <div className='orderlit'>
                            <table>
                              <tr>
                                <th>เวลา</th>
                                <th>ชื่อสินค้า</th>
                                <th>ราคาสินค้า</th>
                                <th>จำนวนสินค้า</th>
                                <th>ราคารวมสินค้า</th>
                              </tr>
                              <tr>
                                <td><p>{new Date(order.updatedAt).toDateString()}</p></td>
                                <td>{item.name}</td>
                                <td>{item.price.toLocaleString('en-US')}</td>
                                <td>{item.quantity.toLocaleString('en-US')}</td>
                                <td>{item.totalPrice.toLocaleString('en-US')}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                ))}  
                      </div>          
              ))
              }
            </div>
              </div>
            ):(
             <p>...............</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}