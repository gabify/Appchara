import {Card} from 'react-bootstrap'
import OrderDetails from './OrderDetails'
import { useState } from 'react';

const OrderCard = ({order}) => {
    const [showDetails, setShowDetails] = useState(false)
    
    const handleShowDetails = () => setShowDetails(true)
    const handleCloseDetails = () => setShowDetails(false)


    return ( 
        <div className="col col-12 mb-3">
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title>{order.user.name}</Card.Title>
                            <Card.Subtitle>Status: {order.status}</Card.Subtitle>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span className='me-2' style={{cursor: 'pointer'}} onClick={handleShowDetails}>View Order</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <OrderDetails order={order} showDetails={showDetails} handleCloseDetails={handleCloseDetails}/>
        </div>
     );
}
 
export default OrderCard;