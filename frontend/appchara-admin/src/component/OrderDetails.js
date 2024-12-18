import {Modal, Button, Table} from 'react-bootstrap'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const OrderDetails = ({order, showDetails, handleCloseDetails, handleComplete, handleCancel, error, setError}) => {
    const currentOrder = order

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
                        <p className="fw-bold">{formatDistanceToNow(new Date(order.createdAt), {addSuffix: true})}</p>
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
                            {currentOrder.orders.map((item) =>(
                                <tr key={item._id} className='text-center'>
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
                {order.status === 'complete' || order.status === 'cancelled' ? (
                    <Modal.Footer>
                        <Button variant="danger" disabled>
                            Cancel
                        </Button>
                        <Button variant="success" disabled>
                            Complete
                        </Button>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleComplete}>
                            Complete
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
     );
}
 
export default OrderDetails;