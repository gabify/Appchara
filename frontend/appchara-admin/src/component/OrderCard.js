import {Card} from 'react-bootstrap'
import OrderDetails from './OrderDetails'
import { useState } from 'react';

const OrderCard = ({order}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [error, setError] = useState(null)
    let currentOrder = order
    const id = currentOrder._id
    
    const handleShowDetails = () => setShowDetails(true)
    const handleCloseDetails = () => setShowDetails(false)

    const handleComplete = async() =>{
        const response = await fetch(`http://127.0.0.1:5000/api/v1/order/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(error)
        }else{
            setError(null)
            handleCloseDetails()
            currentOrder = result
            console.log('Order Completed')
        }

    }

    const handleCancel = async() =>{
        const response = await fetch(`http://127.0.0.1:5000/api/v1/order/cancel/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(error)
        }else{
            setError(null)
            handleCloseDetails()
            currentOrder = result
            console.log('Order Cancelled')
        }
    }


    return ( 
        <div>
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

            <OrderDetails 
                order={order} 
                showDetails={showDetails} 
                handleCloseDetails={handleCloseDetails} 
                handleComplete={handleComplete} 
                handleCancel={handleCancel}
                error={error}
                setError={setError}
            />
        </div>
     );
}
 
export default OrderCard;