import { useState, useEffect } from 'react'
import OrderCard from '../component/OrderCard'

const Order = () => {
    const [orders, setOrders] = useState([])

    useEffect(() =>{
        const fetchOrder = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/order/')
            const result = await response.json()

            if(response.ok){
                setOrders(result)
            }
        }

        fetchOrder()
    }, [])


    return ( 
        <div className="orders">
            <div className="px-5 py-2">
                <div className="row">
                    {orders && orders.map((order) =>(
                        <OrderCard order={order} key={order._id}/>
                    ))}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Order;