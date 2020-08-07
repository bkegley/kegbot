import React from 'react'

export const OrdersList = () => {
  const [orders, setOrders] = React.useState()
 
  React.useEffect(() => {
    fetch('http://localhost:4040/orders').then(res => res.json()).then(setOrders).catch(console.error)
  }, [])
  
  if (!orders) return null
  return (
    <div>
       {orders.map(order => {
         return (
           <div>
             <h1>{order.description}</h1>
             <p>{order.approved ? 'approved' : 'not approved'}</p>
           </div>
         )
      })}
    </div>
  )
}
