import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminOrders.css'

const CustomOrders = () => {
    const [orders, setOrders] = useState([])


    useEffect(() => {
        axios.get(`/custom`
        )
        .then(res=>{
           let items = [];
           res.data.forEach(doc=>{
               if(doc.status==='open'){
               items.push(doc)
               }
           })
           setOrders(items)
           
        })
        .catch(err=>{
          console.log(err)
        })
    }, [])
    
  
    return (
      <div className='adminOrders'>
          {orders.length>0?orders.map(order=>{
              return(
                <div className='orderContainer'>
                    <span>Name: {order.name}</span>
                    <span>Email: {order.email}</span>
                    <span>Details: {order.message}</span>
                    <a rel="noopener noreferrer" href={order.url} target='_blank'>Attachment</a>
                </div>)
          }):'no'}
    </div>
    )
  };
  
  
  
  export default CustomOrders;