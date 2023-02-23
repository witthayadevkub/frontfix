import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './order.css'
// import { useContext } from "react"
// import { Context } from "../../context/Context"
const Orders = () => {
    // const { user } = useContext(Context)
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([])
    useEffect(()=>{
        axios.get('/orders/')
        .then(res => {
            setOrders(res.data) 
            setFilter(res.data)
        })
        
       
      },[])
      
      const filterDate = (e) => {
        if(e.target.value === ""){
            setOrders(filter)
      }else{

        const filterResult = filter.filter(item => item.updatedAt.toLowerCase().includes(e.target.value.toLowerCase()) || item.customer.toLowerCase().includes(e.target.value.toLowerCase()))
        if(filterResult.length > 0){
            setOrders(filterResult)
        }else{
            setOrders([])
        }
        
      }
      setSearch(e.target.value)
      }

  return (
       <>
       <div className='inputfilter'>
            <h3>ค้นหา</h3>
            จากวันที่สั่ง order  <input type='date'  value={search} onInput={(e)=>filterDate(e)} />
            
            จากชื่อลูกค้า  <input type='text'  value={search} onInput={(e)=>filterDate(e)} />
       </div>
       
       <div>
        {/* {order.filter(vac=>vac.startsWith(user.username)) ?( */}
            <div className='order'>
         
            <div className='container grid'>
            {orders.map((order) => (
                <div className='box boxItems' key={order.id}>
                  
                    {/* <h1>{order.name}</h1> */}
                    <p><span>ชื่อลูกค้า</span> {order.customer}</p>
                    <p><span>ที่อยู่สำหรับการจัดส่ง</span> {order.address}</p>
                    <br />
                    <div>
                        <h6>สินค้าที่ต้องจัดส่ง</h6>
                        <p>{new Date(order.updatedAt).toDateString()}</p>
                    {order.alloder.map((item,index) => (
                        <div className='orderlit' key={index}>
                            <p>ลำดับที่ :: {index+1}</p>
                            <p>ชื่อสินค้า :: {item.name}</p>
                            <p>ราคาสินค้า :: {item.price}</p>
                            <p>จำนวนสินค้า :: {item.quantity}</p>
                            <p>ราคารวมสินค้า :: {item.totalPrice}</p>
                           
                        </div>
                        
                        
                    ))
                    }
                    </div>
                    
                </div>
            ))
            }
    
    
            </div>
        </div>
        {/* ):(
            <h1>คุณยังไม่มี Order โปรดสั่งสินค้า </h1>
        )} */}
       </div>
       </>
    
  )
}

export default Orders