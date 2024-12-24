import { useState, useEffect } from 'react'
import { Tabs, Tab, Badge, Stack } from 'react-bootstrap'
import OrderCard from '../component/OrderCard'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [key, setKey] = useState('all')

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

    function TabOrders ({orders, status}){       
        if(!Array.isArray(orders) || orders.length === 0){
            return <div>No orders at the moment!</div> 
        }

        let filteredOrders;

        switch(status){
            case 'pending':
                filteredOrders = orders.filter((order) => order.status === 'pending')
                break;
            case 'complete':
                filteredOrders = orders.filter((order) => order.status === 'complete')
                break;
            case 'cancelled':
                filteredOrders = orders.filter((order) => order.status === 'cancelled')
                break;
            default:
                filteredOrders = orders
        }
        if(filteredOrders.length === 0){
            return(
                <div>No {status} orders at the moment!</div>
            )   
        }

        return(
            <Stack gap={2}>
                {filteredOrders.map((order) =>(
                    <OrderCard order={order} key={order._id}/>
                ))}
            </Stack>
        )
    }

    function OrderBadge({orders, status}){
        if(!Array.isArray(orders) || orders.length === 0){
            <Badge pill bg="danger" className="ms-2">0</Badge>
        }

        let filteredOrders;

        switch(status){
            case 'pending':
                filteredOrders = orders.filter((order) => order.status === 'pending')
                break;
            case 'complete':
                filteredOrders = orders.filter((order) => order.status === 'complete')
                break;
            case 'cancelled':
                filteredOrders = orders.filter((order) => order.status === 'cancelled')
                break;
            default:
                filteredOrders = orders
        }
        if(filteredOrders.length === 0){
            return <Badge pill bg="danger" className="ms-2">0</Badge>   
        }

        return(
            <Badge pill bg="danger" className="ms-2">
                {filteredOrders.length}
            </Badge>
        )
    }


    return ( 
        <div className="orders">
            <div className="px-5 py-2">
                <Tabs
                    id="order-tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab eventKey="all" title={
                        <>
                            All Orders 
                            <OrderBadge orders={orders}/>
                        </>
                    }>
                        <TabOrders orders={orders}/>
                    </Tab>
                    <Tab eventKey="pending" title={
                        <>
                            Pending Orders 
                            <OrderBadge orders={orders} status={"pending"}/>
                        </>
                    }>
                        <TabOrders orders={orders} status={'pending'}/>
                    </Tab>
                    <Tab eventKey="complete" title={
                        <>
                            Completed Orders 
                            <OrderBadge orders={orders} status={"complete"}/>
                        </>
                    }>
                        <TabOrders orders={orders} status={'complete'}/>
                    </Tab>
                    <Tab eventKey="cancelled" title={
                        <>
                            Cancelled Orders 
                            <OrderBadge orders={orders} status={"cancelled"}/>
                        </>
                    }>
                        <TabOrders orders={orders} status={'cancelled'}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
     );
}
 
export default Order;