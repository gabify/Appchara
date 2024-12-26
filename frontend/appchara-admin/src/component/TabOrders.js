import { Stack } from "react-bootstrap";
import OrderCard from "./OrderCard";

const TabOrders = ({orders, status}) => {
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
        <Stack gap={2} className="px-3">
            {filteredOrders.map((order) =>(
                <OrderCard order={order} key={order._id}/>
            ))}
        </Stack>
    );
}
 
export default TabOrders;