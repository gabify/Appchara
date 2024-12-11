import { useState } from 'react'
import {Modal, Button, Table} from 'react-bootstrap'

const OrderDetails = ({order, showDetails, handleCloseDetails}) => {
    const id = order._id
    const [error, setError] = useState(null)

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
            console.log('Order Completed')
        }

    }

    return ( 
        <div className='order-details'>
            <Modal show={showDetails} onHide={handleCloseDetails} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex">
                        <p className='me-2'>Order Id: </p>
                        <p className="fw-bold">{order._id}</p>
                    </div>
                    <div className="d-flex">
                        <p className='me-2'>Order By: </p>
                        <p className="fw-bold">{order.user.name}</p>
                    </div>
                    <div className="d-flex">
                        <p className='me-2'>Status: </p>
                        <p className="fw-bold">{order.status}</p>
                    </div>
                    <div className="d-flex">
                        <p className='me-2'>Order Date: </p>
                        <p className="fw-bold">{order.createdAt}</p>
                    </div>
                    <hr />
                    <Table borderless hover size='sm' className='px-5'>
                        <thead>
                            <tr className='text-center'>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orders.map((item) =>(
                                <tr id={item._id} className='text-center'>
                                    <td>{item.product.name}</td>
                                    <td>x{item.quantity}</td>
                                    <td>₱{item.sale_per_item}.00</td>
                                </tr>
                            ))}
                            <tr className='border-top'>
                                <td colSpan={2} className='text-end'>Total:</td>
                                <td className='fw-bold text-center'>₱{order.total}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseDetails}>
                        Cancel
                    </Button>

                    <Button variant="success" onClick={handleComplete}>
                        Complete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default OrderDetails;