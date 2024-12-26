import { Badge } from "react-bootstrap";

const OrderBadge = ({orders, status}) => {
    if(!Array.isArray(orders) || orders.length === 0){
        <Badge pill bg="success" className="ms-2">0</Badge>
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
        return <Badge pill bg="success" className="ms-2">0</Badge>   
    }

    return(
        <Badge pill bg="success" className="ms-2">
            {filteredOrders.length}
        </Badge>
    )
}
 
export default OrderBadge;